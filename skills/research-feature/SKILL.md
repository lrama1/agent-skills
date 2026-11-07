---
name: research-feature
description: Research how existing functionality works, especially code that was not created with create-feature, and offer to document it as a feature. Use when the user asks how something works, wants to understand or reverse-engineer an area of the code, or wants existing behavior captured as a spec and design. Read-only investigation with evidence, then optionally writes spec.md and design.md (or feature.md) with status implemented.
argument-hint: "[area, feature, file or question to research]"
disable-model-invocation: true
---

# Research feature

Investigate existing behavior, answer the user's question with evidence, then offer to capture it as a documented feature. Never change source code.

## Before you start

Read these files from this skill's folder and follow them throughout:

- [conventions](references/conventions.md): layout, formats, evidence labels, research checklist.
- [clarification protocol](references/clarification-protocol.md): how to ask every question.
- Templates: [spec](references/templates/spec.md), [design](references/templates/design.md), [feature (single file)](references/templates/feature.md).

## Steps

### 1. Scope

Use the argument if one was given. Ask what to research if it is unclear: a question, a feature name, or an entry point such as a route, screen, job or file. If the user does not know where to start, scan the repo, propose 3–5 candidate areas as options, and recommend one.

Keep the scope **bounded** to one feature or area. Do not try to document the whole system. If the request is larger, propose how to split it and start with the most important part.

Check the docs root first. If the area is already documented, summarize that and offer `/update-feature` instead.

### 2. Investigate (read-only)

Trace the area from its entry points:

- the call flow, data read and written, configuration, and error handling;
- external APIs and libraries (versions, links);
- security and authorization behavior;
- existing tests and what they actually assert;
- comments, docs, `git log` and blame, and linked PRs or tickets for the intent behind the code.

Label every finding **Observed**, **Intended** or **Inferred** (conventions §7). Use relative links to files as evidence.

### 3. Report and offer

Answer the user's question first. Then summarize:

- how the feature works, in a few bullets;
- the files, entry points and tests;
- gaps: behavior with no tests, unclear intent, unusual code.

Then ask whether to document it, per the protocol:

1. Document it as a feature **(Recommended)** — if the feature is meaningful and will be changed again.
2. Summary only — do not write files.

If the user declines, stop here.

### 4. Clarify intent

For behavior whose intent is unclear (a quirk, an inconsistency, a possible bug), ask about the most significant ones (max 5; group related behaviors). Options:

1. **Intended** — document it as a requirement. Recommended when tests or docs support it.
2. **Bug or legacy quirk** — record it under Known issues, not as a requirement.
3. **Unsure** — record `[NEEDS CLARIFICATION: ...]`.

Also confirm the feature name and journey, and the single-file versus spec + design format (conventions §1).

### 5. Write the documents

Create the documents from the templates, describing behavior **as built**:

- Requirements and acceptance criteria are derived from the code and tests. Only **Observed** or **Intended** behavior becomes a requirement; **Inferred** behavior is marked as such or goes under Open questions.
- Put the unwanted behavior under Known issues.
- The design describes the actual components, data, dependencies and decisions. When the original rationale is unknown, write "Rationale unknown (inferred): ...".
- Map acceptance criteria to existing tests in the test plan, and note which have none.
- Set `code_paths`. Set `status: implemented`, a changelog row `Documented existing behavior (research)` with State `done`, and the date.

### 6. Check and report

Run the final consistency check (conventions §12). Reply briefly with links to the files, the confidence level, and the untested or unknown areas. Suggest `/update-feature <feature-name>` for any change.

## Rules

- Read-only for source code; write only under the docs root.
- Do not turn bugs into requirements, and do not present inferences as facts.
- Do not back-fill specs for code the user did not ask about.
