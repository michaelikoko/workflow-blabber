import { STATUS_CONFIG, type Notification, type SlackConfig, type StatusConfigObj } from "../types";
import axios from "axios";


export async function sendSlackMessage(notification: Notification, slackConfig: SlackConfig): Promise<void> {
  const config: StatusConfigObj = STATUS_CONFIG[notification.status];
  const attachments = [{
    color: config.color,
    title: `${config.emoji} ${notification.title}`,
    text: notification.message,
    fields: [
      { title: 'Repository', value: notification.repositoryUrl, inline: true },
      { title: 'Workflow', value: notification.workflow, inline: true },
      { title: 'Branch', value: notification.branch, inline: true },
      { title: 'Event', value: notification.event, inline: true },
      { title: 'Commit Message', value: notification.commitMessage, inline: false },
      { title: 'Commit Hash', value: notification.commitHash, inline: true },
      { title: 'Actor', value: notification.actor, inline: true },
      { title: 'Date', value: notification.date, inline: true },
      { title: 'Time', value: notification.time, inline: true }
    ],
    actions: [{
      type: 'button',
      text: 'View Workflow Run',
      url: notification.actionUrl
    }],
    fallback: `${config.emoji} ${notification.title} - ${notification.actionUrl}`
  }];
  const data = JSON.stringify({ 
    username: 'Workflow Blabber',
    icon_emoji: ':robot_face:',
    attachments
   });
  try {
    await axios.post(slackConfig.slackWebhookUrl, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : String(error)}`);
  }
};