---
name: update-feature
description: Update an existing feature's spec and design when requirements change. Use when the user wants to change, extend or fix the documented behavior of a feature, or has a new story for it. Finds the feature (or lets the user pick one, or create it if it does not exist), interviews the user, checks architecture patterns and 2nd/3rd-party API docs, edits spec.md and design.md in place, and records a changelog entry so implement-feature builds only what changed.
argument-hint: "[feature name or story URL]"
disable-model-invocation: true
---

# Update feature

Change an existing feature's documents so that `/implement-feature` can build the difference. Write documents only; do not write production code.

## Before you start

Read these files from this skill's folder and follow them throughout:

- [conventions](references/conventions.md): layout, formats, statuses, IDs, changelog, research checklist.
- [clarification protocol](references/clarification-protocol.md): how to ask every question.
- Templates (used only when creating): [spec](references/templates/spec.md), [design](references/templates/design.md), [feature (single file)](references/templates/feature.md).

## Steps

### 1. Find the feature

Use the argument if one was given. List the existing features (conventions §1) with their journey and status. Ask which one to update, with the best match recommended. Always include "Create a new feature" as an option.

If the feature does not exist, or the user picks "Create a new feature":

- Load and follow the `create-feature` skill if it is available.
- Otherwise do this condensed version:
  1. collect name, description, story URL and journey;
  2. run the research checklist (conventions §9);
  3. ask spec questions, then write the spec;
  4. ask design questions, then write the design;
  5. run the consistency check and ask for approval.
- Stop after that; the rest of this skill is for existing features.

### 2. Understand the change

Ask only what is missing: what changes and why, and the story URL(s) (fetch them per conventions §10). Then read the feature's current spec and design (or `feature.md`), its changelog, and the code at its `code_paths`.

Check for these situations before going on:

- **Pending rows.** If the spec changelog already has `pending` rows, tell the user and ask whether to add this change to them (recommended) or finish them first.
- **Deprecated.** If the status is `deprecated`, ask whether to revive it.
- **Drift.** If the code visibly differs from the documents, summarize the differences and ask whether to reconcile them in this update (recommended) or ignore them.
- **Wording only.** If the change is only wording, make the edit, add a changelog row with State `done`, and skip the interview and approval.

### 3. Research

Run the research checklist (conventions §9), focused on the areas this change touches. Re-check external API docs if the change involves them.

### 4. Clarify

Ask spec-phase questions (max 5), then design-phase questions (max 5), per the protocol. Include the single final question about scope expansions. If the feature is a single `feature.md` and the change makes it large, offer to split it (conventions §1).

### 5. Edit in place

Edit the documents so they describe the feature **as it will be**, in present tense:

- Change affected requirements and acceptance criteria. Keep their IDs. New items continue the numbering; removed items are deleted from the body. Never reuse an ID.
- Update the design: approach, changes, dependencies and test plan. Add new `D-n` decisions.
- Update Related documentation: find the other project docs this change makes wrong or incomplete (conventions §11), and add, change or remove rows. Do not edit those docs now; `/implement-feature` does that.
- Add the answers to Clarifications and Decisions.
- Add a changelog row to the spec (State `pending`) and one to the design. Name the affected IDs in `Affects`.
- Set `status: draft` while the change is unapproved.

Do not leave change history in the body of any document.

### 6. Check and approve

Run the final consistency check (conventions §12). Ask the approval question (protocol §7). Set `status: approved` only if the user chooses it.

### 7. Report

Reply briefly with:

- links to the edited files;
- a summary of what changed (IDs added, changed and removed);
- the other docs that will need changes (from Related documentation);
- assumptions and open questions;
- the next step: `/implement-feature <feature-name>`.

## Rules

- Edit only the feature's own documents under the docs root. Do not change source code or other project docs (README, API docs, ...); list them under Related documentation instead.
- Keep documents as current truth; history lives only in the changelog.
- Never invent requirements or API behavior. Use `[NEEDS CLARIFICATION: ...]`.
