import z from "zod";
declare const allowedChannels: readonly ["email", "discord", "slack", "telegram"];
export type NotificationChannel = (typeof allowedChannels)[number];
export declare function isValidChannel(channel: string): channel is NotificationChannel;
export interface ValidateChannelsFunctionOutput {
    validChannels: Array<NotificationChannel>;
    invalidChannels: Array<string>;
}
export declare const emailSchema: z.ZodObject<{
    smtpHost: z.ZodString;
    smtpPort: z.ZodNumber;
    smtpUser: z.ZodString;
    smtpPassword: z.ZodString;
    smtpSecure: z.ZodOptional<z.ZodBoolean>;
    recipientEmail: z.ZodEmail;
    emailSubject: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type EmailConfig = z.infer<typeof emailSchema>;
export declare const discordSchema: z.ZodObject<{
    discordWebhookUrl: z.ZodURL;
}, z.core.$strip>;
export type DiscordConfig = z.infer<typeof discordSchema>;
export declare const slackSchema: z.ZodObject<{
    slackWebhookUrl: z.ZodURL;
}, z.core.$strip>;
export type SlackConfig = z.infer<typeof slackSchema>;
export declare const telegramSchema: z.ZodObject<{
    telegramBotToken: z.ZodString;
    telegramChatId: z.ZodString;
}, z.core.$strip>;
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
export declare const STATUS_CONFIG: StatusConfig;
export {};
