export declare function isGitRepositoryAtRoot(storeRoot: string): Promise<boolean>;
export declare function initGitRepository(storeRoot: string): Promise<boolean>;
/**
 * `git var` resolves identity exactly as `git commit` would (config, env vars,
 * auto-detection), so this fails precisely when the initial commit would.
 */
export declare function assertGitCommitIdentity(probeCwd: string): Promise<void>;
/**
 * Index-preserving initial commit: the pathspec on `git commit` keeps files
 * the user had already staged out of setup's commit and leaves them staged.
 * Pathspecs may be files or directories.
 */
export declare function commitStoreFiles(storeRoot: string, id: string, pathspecs: string[]): Promise<boolean>;
export declare function gitHasCommits(storeRoot: string): Promise<boolean | null>;
export declare function gitHasUncommittedChanges(storeRoot: string): Promise<boolean | null>;
export declare function gitHasRemote(storeRoot: string): Promise<boolean | null>;
/**
 * The configured origin URL, read from local Git config only — never a
 * network touch. Null when there is no repository or no origin.
 */
export declare function gitOriginUrl(storeRoot: string): Promise<string | null>;
export interface GitTrackingDrift {
    ahead: number;
    behind: number;
}
/**
 * Ahead/behind counts of HEAD against its configured upstream tracking
 * ref, read from local refs only — no fetch, no network. The comparison
 * is therefore against the current local upstream ref (typically last
 * updated by fetch, but it may be a local branch), not the live remote.
 * Null when there is no repository, no upstream, a detached HEAD, or Git
 * is unavailable: the absence of a comparison is not drift.
 */
export declare function gitTrackingDrift(storeRoot: string): Promise<GitTrackingDrift | null>;
export declare function gitDirectoryHasTrackedFiles(storeRoot: string, relativeDir: string): Promise<boolean | null>;
//# sourceMappingURL=git.d.ts.map