import { ValidationReport } from './types.js';
export declare class Validator {
    private strictMode;
    constructor(strictMode?: boolean);
    validateSpec(filePath: string): Promise<ValidationReport>;
    /**
     * Validate spec content from a string (used for pre-write validation of rebuilt specs)
     */
    validateSpecContent(specName: string, content: string): Promise<ValidationReport>;
    validateChange(filePath: string): Promise<ValidationReport>;
    /**
     * Validate delta-formatted spec files under a change directory.
     * Enforces:
     * - At least one delta across all files
     * - ADDED/MODIFIED: each requirement has at least one scenario; missing
     *   English SHALL/MUST keywords are guidance unless strict mode is enabled
     * - REMOVED: names only; no scenario/description required
     * - RENAMED: pairs well-formed
     * - No duplicates within sections; no cross-section conflicts per spec
     *
     * When `options.mainSpecsDir` is given, MODIFIED blocks are also checked
     * against the current main specs for the scenario loss archive refuses to
     * apply (#1477). When `options.projectRoot` is given, the schema's tracked
     * task files are checked for ambiguous numbering (#1520). Omitting either
     * option keeps existing library and archive callers behaving as before.
     */
    validateChangeDeltaSpecs(changeDir: string, options?: {
        mainSpecsDir?: string;
        projectRoot?: string;
    }): Promise<ValidationReport>;
    private collectTaskNumberingIssues;
    /**
     * Report MODIFIED requirements whose block omits a scenario the main spec
     * still carries. Uses the same comparison archive applies, so validate can
     * only report what archive would refuse.
     *
     * Silent when the main spec or the requirement header is absent: applying a
     * MODIFIED against a base that is not there yet is a different failure (a
     * sister change still in flight is the legitimate case), and archive is the
     * gate for it. A spec that exists but cannot be read is not absent, though —
     * archive aborts on it, so reporting it beats calling the change valid.
     */
    private findScenarioLossIssues;
    private formatInvalidMarkerMessage;
    private convertZodErrors;
    private applySpecRules;
    private applyChangeRules;
    private enrichTopLevelError;
    private extractNameFromPath;
    private createReport;
    isValid(report: ValidationReport): boolean;
    private extractRequirementText;
    private containsShallOrMust;
    /**
     * Build a message for a requirement block whose body lacks SHALL/MUST.
     *
     * When the SHALL/MUST keyword already appears in the requirement header (e.g.
     * `### Requirement: The system SHALL ...`) the original generic error
     * ("must contain SHALL or MUST") is confusing because the keyword is visibly
     * present in the spec. Per the OpenSpec conventions the keyword has to live
     * on the requirement body line (the line right after the header), so we point
     * the author at that exact fix when the keyword is found in the header only.
     */
    private buildMissingShallOrMustMessage;
    private countScenarios;
    private formatSectionList;
}
//# sourceMappingURL=validator.d.ts.map