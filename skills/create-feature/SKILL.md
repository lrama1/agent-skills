---
name: create-feature
description: Create a new feature's spec and technical design through an interview. Use when the user wants to define, spec or design a new feature or story before any code is written. Collects name, description and story URL (Jira, Azure DevOps, GitHub), studies the repo's architecture, coding patterns and 2nd/3rd-party API docs, asks clarifying questions with a recommended option first, and writes spec.md and design.md (or one feature.md for small features) under docs/journeys, grouped by journey and feature.
argument-hint: "[feature name or story URL]"
disable-model-invocation: true
---

# Create feature

Turn an idea or story into an approved spec and technical design that `/implement-feature` can build. Write documents only; do not write production code.

## Before you start

Read these files from this skill's folder and follow them throughout:

- [conventions](references/conventions.md): layout, formats, statuses, IDs, research checklist, story intake.
- [clarification protocol](references/clarification-protocol.md): how to ask every question.
- Templates: [spec](references/templates/spec.md), [design](references/templates/design.md), [feature (single file)](references/templates/feature.md).

## Steps

### 1. Intake

Use the argument if one was given. Ask only for what is still missing, using the clarification protocol (batch these questions if the host allows):

- **Feature name** (kebab-case) and a **short description**.
- **Story URL(s)** (Jira, Azure DevOps, GitHub, ...). If given, fetch them as described in conventions §10.
- **Journey.** List the folders that exist under the docs root and offer them, recommending the best match, plus "new journey".

Then check the docs root for a feature that already covers this request. If one exists, tell the user and ask whether to update it instead (recommended; hand off to `/update-feature`) or create a distinct feature.

### 2. Research

Run the research checklist in conventions §9, read-only. Then give the user a short summary (5–8 bullets with links): the patterns you will follow, the comparable features, the external APIs and versions, and anything surprising.

### 3. Spec

Draft requirements and acceptance criteria from the story and your findings. Then ask the spec-phase questions (max 5) per the protocol. Include:

- the single-file versus spec + design choice (conventions §1), with a recommendation;
- one final question collecting sensible scope expansions (protocol §4).

Write `spec.md` (or the spec part of `feature.md`) from the template. Add the answers under Clarifications.

### 4. Design

Ask the design-phase questions (max 5) per the protocol. Typical topics are data model, API shape, which existing pattern to follow, security, and rollout. Write `design.md` (or the design part of `feature.md`) from the template:

- Link to the example files you are following instead of pasting code.
- Fill in External dependencies with versions and sources.
- Record each choice under Decisions.
- Map every acceptance criterion to a planned test.

### 5. Check and approve

Run the final consistency check in conventions §11 and fix what it finds. Add a changelog row `Initial version` with State `pending` to the spec (and a row in the design). Ask the approval question from the protocol (§7). Set `status: approved` only if the user chooses it; otherwise leave `draft`.

### 6. Report

Reply briefly with:

- links to the files you created;
- the decisions made and any assumptions;
- open questions;
- the next step: `/implement-feature <feature-name>`.

## Rules

- Create files only under the docs root. Do not edit source code.
- Do not ask what you can find in the repo or the story.
- Never invent story details, API behavior or requirements. Use `[NEEDS CLARIFICATION: ...]`.
- Keep each document as short as it can be while staying testable.
