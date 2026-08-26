# Roadmap: Plan Before You Explore Each Change

`/opsx:roadmap` is the project-level planning workflow in this OpenSpec fork. Use it when one initiative is too broad for a single change and needs to be delivered as a sequence of focused, independently verifiable changes.

Roadmap does not replace Explore, Propose, Apply, Sync, or Archive. It sits one level above them:

```text
Broad initiative
      │
      ▼
/opsx:roadmap
      │  proposes and records focused change boundaries
      ▼
Phase 1: explore → propose → apply → archive
      │
      ├── reconcile roadmap progress
      ▼
Phase 2: explore → propose → apply → archive
```

## When to Use It

Use Roadmap for:

- a product initiative containing several independently useful capabilities;
- a migration or architecture program that must be delivered safely in stages;
- a request to view or reconcile project-wide OpenSpec progress;
- deciding how a large body of work should be split before exploring its first change.

Skip Roadmap for a single cohesive feature, bug fix, or refactor. Start those with `/opsx:explore` when decisions remain, or `/opsx:propose` when the scope is already clear.

Roadmap is in the default `core` profile. It is available after `openspec init` or `openspec update`.

## Invoke It

The canonical command is:

```text
/opsx:roadmap <broad initiative>
```

The spelling depends on your AI tool. Common forms include:

- Claude Code: `/opsx:roadmap`
- Cursor and GitHub Copilot: `/opsx-roadmap`
- Codex: `$openspec-roadmap`
- skills-only agents: `/openspec-roadmap` or natural-language Skill selection

`openspec init` generates the correct command or Skill for the tools you select.

## What It Does

Roadmap first grounds itself in the current project. It reads the resolved OpenSpec root, relevant specs, active changes, archived changes, and the code needed to understand dependencies and existing architecture.

It then classifies the request:

- **Single Change** — recommends one change ID and hands off without creating a one-item roadmap.
- **Multi-Phase Initiative** — proposes vertical phases, where each phase is one independently valuable OpenSpec change.

For each proposed phase it records only:

- a stable phase name and kebab-case change ID;
- the user or business outcome;
- the phase boundary and deferred scope;
- required dependencies;
- one short verification signal.

It shows the decomposition first. The roadmap file is created or updated only after you confirm it.

## What It Does Not Do

Roadmap never:

- implements application code;
- creates every future change directory;
- writes an individual change's `proposal.md`, `design.md`, delta specs, or `tasks.md`;
- duplicates detailed APIs, database fields, acceptance criteria, or implementation tasks;
- automatically invokes Explore or starts the next phase.

This boundary keeps later phases adaptable. Each phase gets a fresh Explore pass against the code and specs produced by earlier phases.

## Roadmap File

The confirmed plan is stored at `openspec/roadmap.md`:

```markdown
# Project Roadmap

> Cross-change navigation for this OpenSpec project. Detailed requirements,
> designs, and tasks remain inside each change.

## Initiative

- **Goal:** Add trustworthy AI capabilities to the news application.
- **Success:** Users can retrieve, understand, and ask questions about news.
- **Non-goals:** Autonomous publishing and editorial decisions.

## Progress

- **Current Phase:** Phase 1 — AI News Summary
- **Next Change:** `add-ai-news-summary`
- **Completed:** 0 / 3

## Phases

### Phase 1 — AI News Summary

- [ ] `add-ai-news-summary`
- **Outcome:** Users can request a concise summary for one article.
- **Boundary:** No semantic retrieval or chat.
- **Depends on:** None.
- **Verify:** A summary request returns a validated result and handles provider failure.
```

The roadmap is intentionally short. Detailed requirements and tasks live in each change where OpenSpec can validate and archive them normally.

## Progress Reconciliation

A phase is checked only when its exact matching change is archived and its archived task checklist has no incomplete tasks. An active change remains incomplete even if every task is checked.

Invoke Roadmap again after an archive or before beginning the next phase:

```text
/opsx:roadmap reconcile progress
```

Roadmap compares the file with active and archived OpenSpec evidence, reports discrepancies, and asks before changing recorded progress. A status-only request remains read-only.

## Example

```text
You: /opsx:roadmap Add summaries, semantic search, RAG Q&A, Agent tools,
     Redis result caching, and SSE streaming to this news application.

AI:  This is a multi-phase initiative. I found one archived summary change and
     no active changes. Recommended next phases:

     1. add-summary-cache
     2. add-news-semantic-retrieval
     3. add-rag-news-qa
     4. add-news-agent-tools
     5. add-agent-sse-streaming

     Confirm this decomposition before I write openspec/roadmap.md?

You: Confirm.

AI:  Roadmap updated. Next change: add-summary-cache.
     Start a fresh /opsx:explore add-summary-cache when ready.
```

## Installation

Install the complete Roadmap-enabled CLI from this repository:

```bash
npm install -g github:shuaibilx/OpenSpec
openspec init
```

Or install only the generated workflow Skills into a skills.sh-compatible agent:

```bash
npx skills add shuaibilx/OpenSpec
```

The skills-only option still requires an `openspec` CLI when the workflow needs to inspect project state.
