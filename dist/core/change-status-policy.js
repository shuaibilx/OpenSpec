export function summarizePlanningHome(planningHome) {
    if (!planningHome) {
        return undefined;
    }
    return {
        kind: planningHome.kind,
        root: planningHome.root,
        changesDir: planningHome.changesDir,
        defaultSchema: planningHome.defaultSchema,
    };
}
export function buildActionContext(input) {
    return {
        mode: 'repo-local',
        sourceOfTruth: 'repo',
        planningArtifacts: input.artifactIds,
        linkedContext: [],
        allowedEditRoots: [input.projectRoot],
        requiresAffectedAreaSelection: false,
        constraints: ['Repo-local change artifacts and implementation edits are scoped to this project.'],
    };
}
export function buildNextSteps(input) {
    const readyArtifact = input.artifactStatuses.find((artifact) => artifact.status === 'ready');
    const steps = [];
    const storeFlag = input.storeId ? ` --store ${input.storeId}` : '';
    if (readyArtifact) {
        steps.push(`Run openspec instructions ${readyArtifact.id} --change "${input.changeName}"${storeFlag} --json before writing that artifact.`);
    }
    else if (input.allArtifactsComplete) {
        steps.push(`All planning artifacts are complete. Run openspec instructions apply --change "${input.changeName}"${storeFlag} --json to inspect implementation progress.`);
    }
    return steps;
}
//# sourceMappingURL=change-status-policy.js.map