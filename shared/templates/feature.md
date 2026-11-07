---
feature: <feature-name>
journey: <journey-name>
status: draft
stories:
  - <story URL or ID>
code_paths:
  - <path/to/code>
---

# <Feature title>

<!-- Single-file format for small features: one component and fewer than 5 requirements. Guidance comments: delete them and any unused heading before finishing. Present tense: this is how the feature works NOW; history belongs only in the Changelog. -->

## Context

<!-- Why this exists, who it is for, the journey step it supports. 3-6 sentences. Link the stories. -->

## Requirements

### FR-1 <short title>

<!-- One or two sentences in plain language. -->

- **AC-1.1** Given <state>, when <action>, then <observable result>.

### NFR-1 <short title>

<!-- Measurable non-functional requirement. Delete if none. -->

- **AC-N1.1** ...

## Out of scope / Future

- <item> — <reason>

## Design

### Approach

<!-- The solution in a few sentences and the requirements it covers. -->

### Architecture fit

- Follows [<pattern or example>](<relative link>)

### Changes

| Area | Change | Files |
|---|---|---|
| | | |

### External dependencies

<!-- Name, version, source link, what we rely on, limits/auth/errors. Delete if none. -->

### Decisions

#### D-1 <decision title>

- **Options:** <A>; <B>
- **Chosen:** <option>
- **Why:** <reason>

### Security, risks and rollout

<!-- Delete what does not apply. -->

### Test plan

| Acceptance criteria | Test type | Location |
|---|---|---|
| AC-1.1 | unit | <path> |

## Known issues

<!-- Optional. Observed but not Intended behavior (research-feature). Delete if empty. -->

## Clarifications

- **Q:** <question> **A:** <answer> _(YYYY-MM-DD)_

## Open questions

<!-- [NEEDS CLARIFICATION: ...] items. Delete the section if there are none. -->

## Changelog

| Date | Change | Affects | Story/PR | State |
|---|---|---|---|---|
| YYYY-MM-DD | Initial version | FR-1, D-1 | <story> | pending |
