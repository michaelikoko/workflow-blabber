import { sendEmail } from "./notification_channels/email";
import { discordSchema, emailSchema, slackSchema, telegramSchema, type DiscordConfig, type EmailConfig, type GitHubContext, type Notification, type SlackConfig, type TelegramConfig } from "./types";
import * as core from '@actions/core';
import * as github from '@actions/github';
import validateChannels from "./utils/validateChannels";
import z from "zod";
import { getNotification } from "./utils/getNotification";
import { sendDiscordMessage } from "./notification_channels/discord";
import { sendSlackMessage } from "./notification_channels/slack";
import { sendTelegramMessage } from "./notification_channels/telegram";

async function main(): Promise<void> {
  // Get Input Values 
  const channels: string = core.getInput('channels');
  const status = core.getInput('status');
  const customMessage: string = core.getInput('custom_message');
  const customTitle: string = core.getInput('custom_title');
  const failOnError: boolean = core.getInput('fail_on_error').toLowerCase() === 'true';

  // Email Config Inputs
  const recipientEmail: string = core.getInput('recipient_email');
  const smtpHost: string = core.getInput('smtp_host');
  const smtpPort: string = core.getInput('smtp_port');
  const smtpUser: string = core.getInput('smtp_user');
  const smtpPassword: string = core.getInput('smtp_password');
  const smtpSecure: boolean = core.getInput('smtp_secure').toLowerCase() === 'true';
  const emailSubject: string = core.getInput('email_subject');

  // Discord Config Inputs
  const discordWebhookUrl: string = core.getInput('discord_webhook_url');

  // Slack Config Inputs
  const slackWebhookUrl: string = core.getInput('slack_webhook_url');

  // Extract Telegram Config Inputs
  const telegramBotToken: string = core.getInput('telegram_bot_token');
  const telegramChatId: string = core.getInput('telegram_chat_id');

  // Github Context
  const context = github.context;

  if (status !== 'success' && status !== 'failure' && status !== 'cancelled') {
    throw new Error(`Invalid status input: ${status}. Allowed values are 'success', 'failure', 'cancelled'.`);
  }

  const githubContext = {
    ...context,
    runUrl: `https://github.com/${context.payload.repository?.full_name}/actions/runs/${context.runId}`,
    status: status
  } as GitHubContext;
  
  // Get Notification Channels
  const notificationChannels: Array<string> = channels ? channels.split(',').map(channel => channel.trim().toLowerCase()) : [];

  if (notificationChannels.length === 0) {
    throw new Error('No notification channels specified. Please provide at least one channel.');
  }

  // Extract valid channels
  const { validChannels, invalidChannels } = validateChannels(notificationChannels);

  if (validChannels.length === 0) {
    throw new Error('No valid notification channels specified. Please provide at least one valid channel.');
  }

  if (invalidChannels.length > 0) {
    core.warning(`The following channels are invalid and will be ignored: ${invalidChannels.join(', ')}`);
  }

  const notification: Notification = getNotification(githubContext, customTitle, customMessage);

  const validChannelsPromises: Array<Promise<void>> = validChannels.map(async (channel) => {
    try {
      switch (channel) {
        case 'email': {
          // Validate email configuration before sending
          const emailConfig: EmailConfig = emailSchema.parse({
            smtpHost: smtpHost,
            smtpPort: isNaN(Number(smtpPort)) ? 0 : Number(smtpPort),
            smtpUser: smtpUser,
            smtpPassword: smtpPassword,
            smtpSecure: smtpSecure,
            recipientEmail: recipientEmail,
            emailSubject: emailSubject
          });
          await sendEmail(notification, emailConfig);
          break;
        }
        case 'slack': {
          const slackConfig: SlackConfig = slackSchema.parse({
            slackWebhookUrl: slackWebhookUrl
          });
          await sendSlackMessage(notification, slackConfig);
          break;
        }
        case 'discord': {
          const discordConfig: DiscordConfig = discordSchema.parse({
            discordWebhookUrl: discordWebhookUrl
          });
          await sendDiscordMessage(notification, discordConfig);
          break;
        }
        case 'telegram': {
          const telegramConfig: TelegramConfig = telegramSchema.parse({
            telegramBotToken: telegramBotToken,
            telegramChatId: telegramChatId
          });
          await sendTelegramMessage(notification, telegramConfig);
          break;
        }
        default:
          core.warning(`Unsupported notification channel: ${channel}`);
          break;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle zod validation errors specifically
        for (const issue of error.issues) {
          // Throw the error so it can be caught in the outer catch block
          throw new Error(`Validation error at ${issue.path.join('.')}: ${issue.message}`);
        }
      }
      // Rethrow other errors to be caught in the outer catch block
      throw new Error(`${error instanceof Error ? error.message : String(error)}`);
    }
  });
  const results = await Promise.allSettled(validChannelsPromises);

  results.forEach((result, index) => {
    const channel = validChannels[index];
    if (result.status === 'rejected') {
      if (failOnError) {
        // Fail the entire action
        throw new Error(`Error sending notification via ${channel}: ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`);
      } else {
        // Log the error but do not fail the entire action
        core.error(`Error sending notification via ${channel}: ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`);
      }
    } else {
      core.info(`Notification sent successfully via ${channel}`);
    }
  });
}

try {
  await main();
} catch (error) {
  core.setFailed(`${error instanceof Error ? error.message : String(error)}`);
}
