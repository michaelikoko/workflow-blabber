import z from "zod";

const allowedChannels = ['email', 'discord', 'slack', 'telegram'] as const;
export type NotificationChannel = (typeof allowedChannels)[number];

export function isValidChannel(channel: string): channel is NotificationChannel {
    return allowedChannels.includes(channel as NotificationChannel);
}

export interface ValidateChannelsFunctionOutput {
    validChannels: Array<NotificationChannel>;
    invalidChannels: Array<string>;
}

export const emailSchema = z.object({
    smtpHost: z.string().min(1, {message: "SMTP host is required"}),
    smtpPort: z.number().min(1, {message: "SMTP port must be a positive number"}),
    smtpUser: z.string().min(1, {message: "SMTP user is required"}),
    smtpPassword: z.string().min(1, {message: "SMTP password is required"}),
    smtpSecure: z.boolean().optional(),
    recipientEmail: z.email({error: "Recipient email must be a valid email address"}),
    emailSubject: z.string().optional(),
});

export type EmailConfig = z.infer<typeof emailSchema>;

export const discordSchema = z.object({
    discordWebhookUrl: z.url({message: "Discord webhook URL must be a valid URL"}),
});

export type DiscordConfig = z.infer<typeof discordSchema>;

export const slackSchema = z.object({
    slackWebhookUrl: z.url({message: "Slack webhook URL must be a valid URL"}),
});

export type SlackConfig = z.infer<typeof slackSchema>;

export const telegramSchema = z.object({
    telegramBotToken: z.string().min(1, {message: "Telegram bot token is required"}),
    telegramChatId: z.string().min(1, {message: "Telegram chat ID is required"})
});

export type TelegramConfig = z.infer<typeof telegramSchema>;

export interface GitHubContext {
    actor: string;
    ref: string;
    sha: string;
    workflow: string;
    runId: number;
    payload: {
        repository?: {
            html_url?: string;
            full_name?: string;
        };
        head_commit?: {
            message?: string;
            timestamp?: string;
        };
    };
    runUrl: string;
    eventName: string;
    status: 'success' | 'failure' | 'cancelled';
}

export interface Notification {
    title: string;
    message: string;
    repositoryUrl: string;
    workflow: string;
    branch: string;
    event: string;
    commitHash: string;
    commitMessage: string;
    actor: string;
    actionUrl: string;
    date: string;
    time: string;
    status: 'success' | 'failure' | 'cancelled';
}

export interface StatusConfigObj {
    emoji: string;
    color: string;
    bannerBg: string;
    buttonColor: string;
}

export interface StatusConfig {
    success: StatusConfigObj;
    failure: StatusConfigObj;
    cancelled: StatusConfigObj;
}

export const STATUS_CONFIG: StatusConfig = {
  success: {
    emoji: '✅',
    color: '#1a7f37',
    bannerBg: '#dafbe1',
    buttonColor: '#2da44e'
  },
  failure: {
    emoji: '❌',
    color: '#cf222e',
    bannerBg: '#ffebe9',
    buttonColor: '#cf222e'
  },
  cancelled: {
    emoji: '⚠️',
    color: '#9a6700',
    bannerBg: '#fff8c5',
    buttonColor: '#9a6700'
  }
};
