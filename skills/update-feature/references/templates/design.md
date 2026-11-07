---
feature: <feature-name>
journey: <journey-name>
---

# <Feature title> — Design

Implements [spec.md](./spec.md).

<!-- Guidance comments: delete them and any unused heading before finishing. Present tense: how the feature is built NOW. Link existing files as patterns instead of pasting code. -->

## Approach

<!-- The solution in a few sentences, and which requirements (FR-n) it covers. -->

## Architecture fit

<!-- Existing patterns this follows, each with a link to an example file. Note any deliberate deviation and why. -->

- Follows [<pattern or example>](<relative link>)

## Changes

<!-- What is added or modified: components, data model, API/contracts, configuration, migrations. Use file paths. A table works well. -->

| Area | Change | Files |
|---|---|---|
| | | |

## External dependencies

<!-- 2nd/3rd-party APIs and libraries. Delete if none. -->

| Name | Version | Source | We rely on | Limits / auth / errors |
|---|---|---|---|---|
| | | <link> | | |

## Related documentation

<!-- Other docs this change makes wrong or incomplete (README, API specs, architecture docs, guides). implement-feature edits them after the build. List only docs that really need a change. Delete if none. -->

| Doc | What must change |
|---|---|
| <path> | <change> |

## Decisions

<!-- One entry per design choice, with the alternatives you rejected. -->

### D-1 <decision title>

- **Options:** <A>; <B>; <C>
- **Chosen:** <option> (answered by the user / assumption)
- **Why:** <reason>

## Security and data

<!-- AuthN/AuthZ, PII/PHI handling, audit logging, retention, secrets. Delete if not applicable. -->

## Risks and rollout

<!-- Risks, mitigations, feature flags, migration order, rollback. -->

## Test plan

<!-- Map acceptance criteria to tests. Name tests with the AC id. -->

| Acceptance criteria | Test type | Location |
|---|---|---|
| AC-1.1 | unit | <path> |

## Open questions

<!-- [NEEDS CLARIFICATION: ...] items. Delete the section if there are none. -->

## Changelog

| Date | Change | Affects | Story/PR |
|---|---|---|---|
| YYYY-MM-DD | Initial version | D-1 | <story> |
