/**
 * Update Command
 *
 * Refreshes OpenSpec skills and commands for configured tools.
 * Supports profile-aware updates, delivery changes, migration, and smart update detection.
 */
/**
 * Options for the update command.
 */
export interface UpdateCommandOptions {
    /** Force update even when tools are up to date */
    force?: boolean;
}
/**
 * Scans installed workflow artifacts (skills and managed commands) across all configured tools.
 * Returns the union of detected workflow IDs that match ALL_WORKFLOWS.
 *
 * Wrapper around the shared migration module's scanInstalledWorkflows that accepts tool IDs.
 */
export declare function scanInstalledWorkflows(projectPath: string, toolIds: string[]): string[];
export declare class UpdateCommand {
    private readonly force;
    constructor(options?: UpdateCommandOptions);
    /**
     * Refreshes OpenSpec skills and commands for all configured tools,
     * regenerating artifacts according to the effective profile and delivery mode.
     *
     * @param projectPath - Path to the project root containing the openspec directory
     */
    execute(projectPath: string): Promise<void>;
    private syncCopilotCloudFiles;
    /**
     * Display message when all tools are up to date.
     */
    private displayUpToDateMessage;
    /**
     * Display the update plan showing which tools need updating.
     */
    private displayUpdatePlan;
    /**
     * Shows manual setup notes for configured tools that need extra
     * configuration before they pick up generated files.
     */
    private displaySetupNotes;
    /**
     * Detects new tool directories that aren't currently configured and displays a hint.
     */
    private detectNewTools;
    /**
     * Displays a note about extra workflows installed that aren't in the current profile.
     */
    private displayExtraWorkflowsNote;
    /**
     * Point out core workflows a custom profile is missing, so releases that
     * grow CORE_WORKFLOWS stay discoverable. Keep custom profiles user-owned;
     * do not mutate them.
     */
    private displayMissingCoreWorkflowsNote;
    /**
     * Removes skill directories for workflows when delivery changed to commands-only.
     * Returns the number of directories removed.
     */
    private removeSkillDirs;
    /**
     * Removes skill directories for workflows that are no longer selected in the active profile.
     * Returns the number of directories removed.
     */
    private removeUnselectedSkillDirs;
    /**
     * Removes command files for workflows when delivery changed to skills-only.
     * Returns the number of files removed.
     */
    private removeCommandFiles;
    /**
     * Removes command files for workflows that are no longer selected in the active profile.
     * Returns the number of files removed.
     */
    private removeUnselectedCommandFiles;
    /**
     * Offers to move OpenSpec content out of a renamed tool's former directory
     * when the old location might still be the live one — today, Windsurf's
     * `.windsurf/` after the Devin Desktop rebrand.
     *
     * Interactive runs are asked, because nothing on disk distinguishes a user
     * who took the rebrand from one still on a pre-rebrand Windsurf build that
     * reads only `.windsurf/`. `--force` and non-interactive runs migrate, which
     * is what an unattended upgrade wants.
     */
    /** Surfaces files the move left behind rather than overwriting. */
    private reportKeptInPlace;
    private offerConsentedLegacyMigrations;
    /**
     * Detect and handle legacy OpenSpec artifacts.
     * Unlike init, update warns but continues if legacy files found in non-interactive mode.
     * Returns array of tool IDs that were newly configured during legacy upgrade.
     */
    private handleLegacyCleanup;
    /**
     * Cleans approved repo-local legacy artifacts before configured tools refresh.
     */
    private performImmediateLegacyCleanup;
    /**
     * Cleans approved global Codex prompts after configured tools refresh so newly
     * installed replacement skills can retire their prompts in the same run.
     */
    private performDeferredGlobalPromptCleanup;
    /**
     * Perform cleanup of legacy artifacts.
     */
    private performLegacyCleanup;
    /**
     * Upgrades unconfigured legacy tools into the skills-based setup and carries
     * workflow overrides for migrations that should mirror legacy Codex prompts.
     */
    private upgradeLegacyTools;
}
//# sourceMappingURL=update.d.ts.map