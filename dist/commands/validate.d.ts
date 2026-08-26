interface ExecuteOptions {
    all?: boolean;
    changes?: boolean;
    specs?: boolean;
    archived?: boolean;
    type?: string;
    strict?: boolean;
    json?: boolean;
    noInteractive?: boolean;
    interactive?: boolean;
    concurrency?: string;
    store?: string;
    storePath?: string;
}
export declare class ValidateCommand {
    execute(itemName: string | undefined, options?: ExecuteOptions): Promise<void>;
    private normalizeType;
    /**
     * Resolve change IDs by directory existence within the resolved root — the
     * same rule `openspec status`/`instructions` use (`getAvailableChanges`) —
     * rather than requiring `proposal.md`. This lets `validate` resolve a
     * scaffolded or still-authoring change that the sibling commands already
     * resolve (#1182). Sorted to preserve the prior `getActiveChangeIds` ordering.
     */
    private listChangeIds;
    private runInteractiveSelector;
    private printNonInteractiveHint;
    private validateDirectItem;
    private validateByType;
    private printReport;
    private printNextSteps;
    private runBulkValidation;
    /**
     * Lists archived change ids from the resolved root's archive directory,
     * mirroring `getArchivedChangeIds` but store-aware (uses `root.archiveDir`
     * rather than a cwd-relative path). Directories only, hidden entries skipped.
     *
     * Only a missing archive directory (ENOENT) is an empty list; a permission
     * error, an I/O error, or an `archive` path that is a file (ENOTDIR) is a real
     * failure and must not read as "no archived changes" — that would let a
     * pre-commit lint pass without inspecting anything (#205).
     */
    private listArchivedChangeIds;
    /**
     * Validates that every archived change has all of its tasks completed.
     *
     * An archived change is expected to be finished; an archived change with
     * unchecked tasks is a real integrity problem the normal validate flow never
     * surfaces, because active-change discovery excludes the archive directory
     * (#205). Reuses the same task-progress counting `status`, `list`, and
     * `archive` rely on, so what counts as a task never forks. Changes with no
     * tasks pass (nothing to complete).
     */
    private runArchivedTaskValidation;
}
export {};
//# sourceMappingURL=validate.d.ts.map