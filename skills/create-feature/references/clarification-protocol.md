# Clarification protocol

How every spec-driven skill asks the user questions. Follow it for each question.

## 1. Look before you ask

Resolve what you can from evidence: the story, existing specs and designs, architecture docs, the code, and earlier answers in `## Clarifications` and `## Decisions`. Ask only when the answer is not available **and** it materially changes scope, behavior, data, API contracts, security or compliance, or cost.

Decide everything else yourself and record it as an assumption in the final report.

## 2. Limits

- At most **5 questions per phase**: one phase for the spec, one for the design. Ask the highest-impact ones first.
- If the host's question tool accepts several questions at once, batch 2–4 independent ones in a single call. Otherwise ask one at a time.
- The user may stop early ("done", "use your recommendations"). Apply your recommendation to every remaining question and list those as assumptions.
- Never ask the same question twice. Check the docs first.

## 3. Shape of a question

Each question has:

1. A short question, and one line on **why it matters**.
2. Two to four options, in this order:
   1. **The recommended option**, labeled `(Recommended)`, with a one-line reason based on evidence, such as "matches `src/auth/session.ts`". If there is no evidence, recommend the smallest-scope option and say so.
   2. Alternatives, each with a one-line trade-off.
   3. **Scope expansions** last, each labeled `(expands scope)`.
3. A way to answer freely (the host's free-text input) and, where it makes sense, a **Defer** option. Defer records `[NEEDS CLARIFICATION: ...]` under Open questions.

Mark choices that are hard to reverse with `⚠`. Examples are a public API, a database schema, PII/PHI handling and data retention. State the cost of getting it wrong.

### Example

> **How long should the MFA challenge stay valid?**
> *Why it matters:* it trades security against user friction; sessions currently last 15 minutes (`src/auth/session.ts`).
>
> 1. Reuse the 15-minute session policy **(Recommended)** — consistent with existing auth, no new configuration.
> 2. A separate 5-minute MFA window — stricter, but adds configuration and tests.
> 3. A per-tenant setting **(expands scope)** — needs an admin UI and a migration.
> 4. Defer — record it as an open question.

## 4. Scope expansions

Do not offer expansions as one option among many in every question. Collect the sensible ones into **one question at the end of the spec phase**: "Include any of these now?" The recommendation is **None, log them as future ideas**. Ideas the user does not choose go into the spec's *Out of scope / Future* section so they are not lost.

## 5. How to ask

- Use the host's interactive question tool when one exists. Examples: `askQuestions` in VS Code Copilot Chat, `ask_user` in Copilot CLI, `AskUserQuestion` in Claude Code. Put the recommended option first and mark it.
- If there is no such tool, print a numbered list with the recommendation first, then stop and wait for the reply. Accept "1", "yes" or "recommended" as accepting the recommendation.
- If nobody can answer (a cloud agent or CI run, or the user asked for a fast or non-interactive run):
  - Do not stop.
  - Apply the recommended option for each question.
  - Record each as `Assumption (auto): ...` and list them in the summary.
  - Never auto-approve a spec or design, and never mark a feature `approved` without a person's explicit answer.

## 6. Recording answers

- Spec questions: one line under `## Clarifications` with the question, the answer and the date.
- Design questions: a `D-n` entry under `## Decisions` with the options, the choice and the reason.
- Deferred questions: `[NEEDS CLARIFICATION: ...]` under `## Open questions`.
- Scope expansions that were not chosen: under `## Out of scope / Future`.

## 7. Approval question

When the documents are written, ask one last question:

> Documents are ready for review. Approve them for implementation?
> 1. Review first, keep as `draft` **(Recommended)** — read the files; `/implement-feature` will ask for approval when you run it.
> 2. Approve now — sets `status: approved`.
> 3. Revise — tell me what to change.

Recommend "Review first" unless the user has already reviewed the content in this session. Do not mark `approved` unless the user picks option 2 or says so in their own words.
