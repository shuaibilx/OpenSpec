export declare const COMPLETION_TIP_MESSAGE = "Tip: Run 'openspec completion install' for shell completions";
export interface CompletionTipOptions {
    /**
     * Skip printing without marking the tip as seen, so it still appears on the
     * user's first later run that can safely carry it. Used for runs nobody would
     * read the tip from: JSON output, and stderr that is not a terminal.
     */
    silent?: boolean;
}
/**
 * Print the completion tip once, the first time the CLI runs.
 * Never throws — a hint must not break a command.
 */
export declare function maybeShowCompletionTip(options?: CompletionTipOptions): Promise<void>;
//# sourceMappingURL=completion-tip.d.ts.map