export function getNotification(githubContext, customTitle, customMessage) {
    let message = customMessage;
    if (message.trim().length === 0) {
        // Default message
        switch (githubContext.status) {
            case 'success':
                message = `Workflow ${githubContext.workflow} completed successfully by ${githubContext.actor} on ${githubContext.ref}.`;
                break;
            case 'failure':
                message = `Workflow ${githubContext.workflow} failed during execution by ${githubContext.actor} on ${githubContext.ref}.`;
                break;
            case 'cancelled':
                message = `Workflow ${githubContext.workflow} was cancelled by ${githubContext.actor} on ${githubContext.ref}.`;
                break;
        }
    }
    let time;
    let date;
    if (githubContext.payload.head_commit?.timestamp) {
        // Use github timestamp if available, it is in the format: 2025-11-02T19:56:10+01:00
        const timestamp = githubContext.payload.head_commit.timestamp;
        time = timestamp.split('T')[1]?.split('+')[0];
        date = timestamp.split('T')[0];
    }
    else {
        // Use current time as fallback, default zone is UTC
        time = new Date().toLocaleTimeString();
        date = new Date().toLocaleDateString();
    }
    const notification = {
        title: customTitle || `${githubContext.status.toUpperCase()}: ${githubContext.workflow}`,
        message: message,
        repositoryUrl: githubContext.payload.repository?.html_url || 'N/A',
        workflow: githubContext.workflow,
        branch: githubContext.ref.replace('refs/heads/', ''),
        event: githubContext.eventName,
        commitHash: githubContext.sha,
        commitMessage: githubContext.payload.head_commit?.message || 'N/A',
        actor: githubContext.actor,
        actionUrl: githubContext.runUrl,
        date: date,
        time: time,
        status: githubContext.status
    };
    return notification;
}
//# sourceMappingURL=getNotification.js.map