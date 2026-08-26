import { describe, expect, it } from 'vitest';

import {
  getOpsxRoadmapCommandTemplate,
  getRoadmapInstructions,
  getRoadmapSkillTemplate,
} from '../../../src/core/templates/skill-templates.js';

const skill = getRoadmapSkillTemplate();
const command = getOpsxRoadmapCommandTemplate();
const bodies: Array<[string, string]> = [
  ['skill', skill.instructions],
  ['command', command.content],
];

describe('roadmap templates', () => {
  it('renders the skill and command from one shared instruction contract', () => {
    expect(skill.instructions).toBe(getRoadmapInstructions());
    expect(command.content).toBe(getRoadmapInstructions());
  });

  it('keeps status-only requests read-only', () => {
    for (const [label, body] of bodies) {
      expect(body, label).toContain('A status-only request is read-only');
      expect(body, label).toContain('Do not ask for write confirmation');
    }
  });

  it('keeps the roadmap above individual change artifacts', () => {
    for (const [label, body] of bodies) {
      expect(body, label).toContain('not a second `design.md` or `tasks.md`');
      expect(body, label).toContain('Do not create or edit proposal.md, design.md, delta specs, or tasks.md');
      expect(body, label).toContain('one phase = one independently valuable OpenSpec change');
    }
  });

  it('derives progress from active and archived OpenSpec evidence', () => {
    for (const [label, body] of bodies) {
      expect(body, label).toContain('openspec list --json');
      expect(body, label).toContain('openspec status --change "<name>" --json');
      expect(body, label).toContain('Do not use substring matching');
      expect(body, label).toContain('implemented-but-not-archived');
    }
  });

  it('requires confirmation before writing and never auto-starts a phase', () => {
    for (const [label, body] of bodies) {
      expect(body, label).toContain('confirm the decomposition before creating or updating');
      expect(body, label).toContain('never auto-start Explore, Propose, Apply, or Archive');
    }
  });
});
