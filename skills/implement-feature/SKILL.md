---
name: implement-feature
description: Implement an approved feature (or its pending changes) from its spec and design. Use when the user asks to build, implement or execute a feature that was written with create-feature or update-feature. Checks that the docs are approved and have no open questions, builds only the pending changelog rows, follows the design and existing patterns, writes tests for the acceptance criteria, runs the build and tests, then updates the docs.
argument-hint: "[feature name]"
disable-model-invocation: true
---

# Implement feature

Build what the approved documents describe, verify it, and bring the documents back in line with the code.

## Before you start

Read these files from this skill's folder and follow them throughout:

- [conventions](references/conventions.md): layout, statuses, IDs, changelog, tasks.md.
- [clarification protocol](references/clarification-protocol.md): how to ask every question.
- [tasks template](references/templates/tasks.md): used only for large changes.

## Steps

### 1. Find the feature

Use the argument if one was given; otherwise list the features (conventions §1) whose status is `approved`, `in-progress`, or `draft`, and ask which one. Read its spec and design (or `feature.md`), the project guidance files (`AGENTS.md`, `.github/copilot-instructions.md`), and any existing `tasks.md`.

### 2. Gate checks

- **Draft.** Do not start. Ask: "Stop and review the documents first" (recommended) or "Mark it approved now". Continue only if the user explicitly approves.
- **Deprecated.** Stop and tell the user.
- **Open questions.** If any `[NEEDS CLARIFICATION: ...]` remains in the spec or design, list them and ask the user to resolve them now (using the protocol) or stop. Do not guess.
- **Nothing pending.** If the spec changelog has no `pending` row, say there is nothing to build and suggest `/update-feature`. Stop unless the user asks to re-verify.

### 3. Define the scope

The scope is the **`pending` rows** of the spec changelog: the IDs listed under `Affects`, plus what those depend on. For a new feature, that is everything. Build nothing else. If you notice work outside this scope, mention it at the end instead of doing it.

### 4. Plan

Read the code at `code_paths` and the design's Changes, Architecture fit and Test plan. Follow the linked example files.

- **Large change** (more than about 6 steps, or it will span sessions or people): create `tasks.md` from the template, with tasks tied to requirement IDs. If one already exists, resume from it.
- **Smaller change:** use the session's own task list. Do not create `tasks.md`.

Set `status: in-progress`.

### 5. Implement

Work in small steps, following the design and the repo's existing patterns and conventions.

- Write or update tests for every in-scope acceptance criterion. Put the AC id in the test name or a comment, for example `AC-2.1`.
- Run the repo's build, lint and test commands as you go. Find them in the README, the package or build files, and CI config.
- Tick tasks in `tasks.md` as they finish, and update its resume notes before stopping mid-way.

**If the design is wrong, incomplete or impossible:** stop and ask per the protocol. When the answer changes the approach, update the design (a new or changed `D-n`) and add a design changelog row. Never let the code silently diverge from the documents.

### 6. Verify

Run the full build, lint and tests. Then, for each in-scope acceptance criterion, confirm that a passing test or other evidence covers it. List any that are not covered. Do not report success if checks failed or were not run; say what failed or why you could not run it.

### 7. Update related documentation

Once the build and tests pass, edit the docs listed under Related documentation in the design (conventions §11): the README, API descriptions, architecture docs, guides and so on.

- Make only the listed changes, as small edits in each doc's existing style.
- Regenerate generated docs with the project's command instead of editing them by hand. Skip changelogs the repo generates automatically.
- If you find another doc that the change makes wrong, add it to the table, update it, and mention it in the report.
- If you could not update a doc, say so in the report.

### 8. Finish

- Spec changelog rows: `pending` → `done`. Update the design changelog.
- Update `code_paths` with the files and folders you added.
- Set `status: implemented` once no `pending` rows remain.
- Delete `tasks.md` if every task is done.
- Do not commit or push unless the user asks.

Reply briefly with:

- the files changed, including the related docs you updated;
- a table of acceptance criteria and the test that covers each;
- design deviations and assumptions;
- failed or skipped checks;
- follow-ups.

## Rules

- Never implement from a `draft` or `deprecated` feature, or with open questions.
- Stay within the pending scope.
- The feature documents and the related project docs must match the code when you finish.
