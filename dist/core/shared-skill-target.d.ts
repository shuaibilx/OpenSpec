import { type AIToolOption } from './config.js';
/** Reads a valid-looking marker value without letting linked roots escape. */
export declare function readSharedSkillTarget(projectPath: string, skillsDir: string): string | undefined;
/**
 * A shared skill root can only hold one rendered variant of each skill.
 * Keep the writer recorded so later updates do not infer every tool that
 * happens to use the same directory.
 */
export declare function reconcileSharedSkillTargets(projectPath: string, tools: AIToolOption[]): AIToolOption[];
/**
 * Returns whether a tool is the active writer for its physical skills root.
 * Non-shared roots are always active.
 */
export declare function isSharedSkillTargetActive(projectPath: string, toolId: string): boolean;
/**
 * The tool that already owns `toolId`'s shared skills root, when a DIFFERENT
 * one does. Returns the owner's tool id only when the root already carries an
 * ownership signal (a marker or generated skills) AND reconciliation resolves
 * it to another tool. An empty or unclaimed root returns undefined, so a
 * genuine first-time legacy upgrade — e.g. a Codex-only user with no `.agents`
 * yet — is never reported as owned.
 */
export declare function sharedSkillRootOwner(projectPath: string, toolId: string): string | undefined;
/**
 * Whether generating `toolId` into its shared skills root would clobber a tree
 * a DIFFERENT tool already owns — the guard the legacy-upgrade path uses before
 * writing skills. See {@link sharedSkillRootOwner} for the ownership rules.
 */
export declare function sharedSkillRootOwnedByOther(projectPath: string, toolId: string): boolean;
export declare function writeSharedSkillTarget(projectPath: string, toolId: string): void;
//# sourceMappingURL=shared-skill-target.d.ts.map