import axios from "axios";
import { STATUS_CONFIG, type DiscordConfig, type Notification, type StatusConfigObj } from "../types";

export async function sendDiscordMessage(notification: Notification, discordConfig: DiscordConfig): Promise<void> {
    const config: StatusConfigObj = STATUS_CONFIG[notification.status];
    const embeds =  [{
            title: `${config.emoji} ${notification.title}`,
            description: notification.message,
            color: parseInt(config.color.replace('#', ''), 16),
            url: notification.actionUrl,
            author: {
                name: 'Workflow Blabber'
            },
            fields: [
                { name: 'Repository', value: notification.repositoryUrl, inline: true },
                { name: 'Workflow', value: notification.workflow, inline: true },
                { name: 'Branch', value: notification.branch, inline: true },
                { name: 'Event', value: notification.event, inline: true },
                { name: 'Commit Message', value: notification.commitMessage, inline: false },
                { name: 'Commit Hash', value: notification.commitHash, inline: true },
                { name: 'Actor', value: notification.actor, inline: true },
                { name: 'Date', value: notification.date, inline: true },
                { name: 'Time', value: notification.time, inline: true }
            ]
        },];
    const data = JSON.stringify({ embeds });
    try {
        await axios.post(discordConfig.discordWebhookUrl, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw new Error(`${error instanceof Error ? error.message : String(error)}`);
    }
};