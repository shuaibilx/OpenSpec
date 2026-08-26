# OpenSpec skills for skills.sh

Install the OpenSpec workflow skills into any [skills.sh](https://skills.sh)-compatible agent:

```bash
npx skills add shuaibilx/OpenSpec
```

Each `openspec-*/SKILL.md` here is the same skill `openspec init` writes into a
project, including `openspec-roadmap`. The skills drive the `openspec` CLI, so for the full setup (CLI +
`openspec/` project scaffolding + slash commands) run:

```bash
npm install -g github:shuaibilx/OpenSpec
openspec init
```

> These files are generated from the skill templates — do not edit by hand. Run
> `pnpm build && pnpm generate:skills` after changing a template;
> `skillssh-parity.test.ts` fails if they drift.
