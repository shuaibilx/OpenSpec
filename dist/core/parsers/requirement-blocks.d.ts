export interface RequirementBlock {
    headerLine: string;
    name: string;
    raw: string;
}
export interface RequirementsSectionParts {
    before: string;
    headerLine: string;
    preamble: string;
    bodyBlocks: RequirementBlock[];
    after: string;
}
export declare function normalizeRequirementName(name: string): string;
/**
 * Case- and whitespace-insensitive fold of a requirement name. Requirement
 * matching itself is case-sensitive (normalizeRequirementName); this fold
 * exists only for typo detection - near-miss REMOVED headers and the
 * RENAMED+REMOVED cross-section conflict - where two spellings that differ
 * only in case or interior whitespace mean a mistake, never two requirements.
 */
export declare function foldRequirementName(name: string): string;
/**
 * Extracts the Requirements section from a spec file and parses requirement blocks.
 */
export declare function extractRequirementsSection(content: string): RequirementsSectionParts;
/**
 * A level-3 header inside `## ADDED`/`## MODIFIED Requirements` that is not a
 * canonical `### Requirement:` header, recorded at the moment the delta reader
 * skips over it. Surfaced as an INFO note by `validate <change>` (#498).
 */
export interface SkippedHeader {
    header: string;
    section: string;
    line: number;
}
export interface DeltaPlan {
    added: RequirementBlock[];
    modified: RequirementBlock[];
    removed: string[];
    renamed: Array<{
        from: string;
        to: string;
    }>;
    skippedHeaders: SkippedHeader[];
    sectionPresence: {
        added: boolean;
        modified: boolean;
        removed: boolean;
        renamed: boolean;
    };
}
/**
 * Parse a delta-formatted spec change file content into a DeltaPlan with raw blocks.
 */
export declare function parseDeltaSpec(content: string): DeltaPlan;
/**
 * Scenario names the current requirement block has and the incoming
 * (MODIFIED) block does not. A MODIFIED requirement replaces the whole block,
 * so every name reported here would be dropped from the main spec.
 *
 * Shared by archive (which refuses to apply the block) and validate (which
 * reports the same loss at authoring time, #1477), so the two cannot disagree
 * about what counts as a dropped scenario.
 */
export declare function findMissingCurrentScenarios(current: RequirementBlock, incoming: RequirementBlock): string[];
//# sourceMappingURL=requirement-blocks.d.ts.map