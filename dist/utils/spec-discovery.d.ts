export interface DiscoveredSpec {
    /** Spec id relative to the specs root, forward-slash separated on every platform (e.g. "web" or "platform/session-layout"). */
    id: string;
    /** Path to the spec.md file (absolute if the specs root is absolute). */
    specFile: string;
}
/**
 * Recursively discover every `spec.md` under a specs root, so both the flat
 * `specs/<id>/spec.md` layout and nested `specs/<area>/<id>/spec.md` layouts
 * are found (#1353). A `spec.md` sitting directly in the root is ignored,
 * matching the historical requirement that specs live in a capability folder.
 * Dot-directories are skipped and symlinked directories are not followed.
 * An in-capability symlinked `spec.md` IS resolved: `hasAnyFileUnder` and the
 * artifact graph's globs both count it as content, so dropping it here would
 * silently lose the delta on archive. A link outside its capability is
 * rejected and a dangling link is skipped. Results are sorted by id.
 *
 * A missing root (ENOENT) yields an empty list, but any other read failure
 * (EACCES, EIO, ...) is thrown rather than swallowed: since this feeds the
 * archive/apply merge path, silently dropping an unreadable capability would
 * recreate the exact data-loss class #1353 is closing.
 */
export declare function discoverSpecFiles(specsRoot: string): Promise<DiscoveredSpec[]>;
/**
 * True when any regular non-dot file exists anywhere under the given
 * directory. Used by validate/archive to detect content under a change's
 * specs/ that contradicts a declared skip_specs marker - including files that
 * discoverSpecFiles ignores (a root spec.md, stray non-spec.md notes), since
 * anything there would be silently dropped or misread while the change claims
 * to have nothing. Dot entries (.DS_Store, .gitkeep, dot-directories) are
 * skipped to match discoverSpecFiles - they are invisible to every other
 * code path, so they must not count as spec content. Symlinks DO count
 * (without being followed): the artifact graph's globs follow them, so a
 * symlinked spec would read as existing content while the change claims to
 * have none - it contradicts the marker like any regular file. A missing
 * directory returns false; other read failures are thrown for the caller to
 * decide.
 */
export declare function hasAnyFileUnder(dirPath: string): Promise<boolean>;
//# sourceMappingURL=spec-discovery.d.ts.map