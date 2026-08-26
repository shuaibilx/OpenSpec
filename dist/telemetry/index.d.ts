/**
 * Check if telemetry is enabled.
 *
 * Precedence (first match wins):
 * 1. OPENSPEC_TELEMETRY=0 → disabled
 * 2. DO_NOT_TRACK=1 → disabled
 * 3. CI set to a truthy/on value → disabled (same rule as version-check)
 * 4. global config telemetry.enabled === false → disabled
 * 5. otherwise enabled (unset config means on; opt-out model)
 *
 * Kept synchronous so call sites need not become async. Reads config via
 * sync getGlobalConfig() rather than async getTelemetryConfig().
 */
export declare function isTelemetryEnabled(): boolean;
/**
 * Get or create the anonymous user ID.
 * Lazily generates a UUID on first call and persists it.
 */
export declare function getOrCreateAnonymousId(): Promise<string>;
/**
 * Track a command execution.
 *
 * @param commandName - The command name (e.g., 'init', 'change:apply')
 * @param version - The OpenSpec version
 */
export declare function trackCommand(commandName: string, version: string): Promise<void>;
/**
 * Show first-run telemetry notice if not already seen.
 */
export declare function maybeShowTelemetryNotice(options?: {
    silent?: boolean;
}): Promise<void>;
/**
 * Flush pending telemetry events.
 * Call this before CLI exit.
 */
export declare function shutdown(): Promise<void>;
//# sourceMappingURL=index.d.ts.map