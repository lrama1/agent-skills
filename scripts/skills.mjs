#!/usr/bin/env node
// Maintainer tool. Skills must be self-contained, so the files in shared/ are
// copied into each skill's references/ folder.
//
//   node scripts/skills.mjs sync    copy shared files into the skills
//   node scripts/skills.mjs check   verify copies are in sync and skills are valid (exit 1 on problems)

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sharedDir = join(root, 'shared');
const skillsDir = join(root, 'skills');

const common = ['conventions.md', 'clarification-protocol.md'];
const docTemplates = ['templates/spec.md', 'templates/design.md', 'templates/feature.md'];

// Which shared files each skill needs.
const manifest = {
  'create-feature': [...common, ...docTemplates],
  'update-feature': [...common, ...docTemplates],
  'research-feature': [...common, ...docTemplates],
  'implement-feature': [...common, 'templates/tasks.md'],
};

const lf = (text) => text.replace(/\r\n/g, '\n');
const read = (path) => lf(readFileSync(path, 'utf8'));
const rel = (path) => relative(root, path).replaceAll('\\', '/');

function listFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  });
}

function sync() {
  for (const [skill, files] of Object.entries(manifest)) {
    for (const file of files) {
      const target = join(skillsDir, skill, 'references', file);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, read(join(sharedDir, file)));
    }
  }
  console.log('Synced shared files into skills.');
}

function parseFrontmatter(text) {
  const match = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split('\n')) {
    const kv = /^([A-Za-z-]+):\s*(.*)$/.exec(line);
    if (kv) data[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1');
  }
  return data;
}

function check() {
  const problems = [];

  for (const [skill, files] of Object.entries(manifest)) {
    const skillDir = join(skillsDir, skill);
    const skillFile = join(skillDir, 'SKILL.md');
    if (!existsSync(skillFile)) {
      problems.push(`${rel(skillDir)}: missing SKILL.md`);
      continue;
    }

    const text = read(skillFile);
    const fm = parseFrontmatter(text);
    if (!fm) {
      problems.push(`${rel(skillFile)}: missing front matter`);
    } else {
      if (fm.name !== skill) problems.push(`${rel(skillFile)}: name "${fm.name}" must equal folder "${skill}"`);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name ?? '') || (fm.name ?? '').length > 64) {
        problems.push(`${rel(skillFile)}: invalid name`);
      }
      if (!fm.description) problems.push(`${rel(skillFile)}: missing description`);
      else if (fm.description.length > 1024) problems.push(`${rel(skillFile)}: description is ${fm.description.length} chars (max 1024)`);
    }

    for (const ref of new Set(text.match(/references\/[\w./-]+\.md/g) ?? [])) {
      if (!existsSync(join(skillDir, ref))) problems.push(`${rel(skillFile)}: links to missing ${ref}`);
    }

    for (const file of files) {
      const copy = join(skillDir, 'references', file);
      if (!existsSync(copy)) problems.push(`${rel(copy)}: missing (run sync)`);
      else if (read(copy) !== read(join(sharedDir, file))) problems.push(`${rel(copy)}: differs from shared/${file} (run sync)`);
    }

    const expected = new Set(files.map((file) => join(skillDir, 'references', file)));
    for (const file of listFiles(join(skillDir, 'references'))) {
      if (!expected.has(file)) problems.push(`${rel(file)}: not in the manifest (delete it or add it to scripts/skills.mjs)`);
    }
  }

  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (entry.isDirectory() && !(entry.name in manifest)) {
      problems.push(`skills/${entry.name}: not in the manifest in scripts/skills.mjs`);
    }
  }

  try {
    const plugin = JSON.parse(readFileSync(join(root, 'plugin.json'), 'utf8'));
    if (!plugin.name || !plugin.$schema) problems.push('plugin.json: needs "name" and "$schema"');
  } catch (error) {
    problems.push(`plugin.json: ${error.message}`);
  }

  if (problems.length) {
    console.error(problems.map((problem) => `- ${problem}`).join('\n'));
    process.exit(1);
  }
  console.log(`OK: ${Object.keys(manifest).length} skills valid and in sync.`);
}

const command = process.argv[2];
if (command === 'sync') sync();
else if (command === 'check') check();
else {
  console.error('Usage: node scripts/skills.mjs <sync|check>');
  process.exit(1);
}
