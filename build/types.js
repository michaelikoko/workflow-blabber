import z from "zod";
const allowedChannels = ['email', 'discord', 'slack', 'telegram'];
export function isValidChannel(channel) {
    return allowedChannels.includes(channel);
}
export const emailSchema = z.object({
    smtpHost: z.string().min(1, { message: "SMTP host is required" }),
    smtpPort: z.number().min(1, { message: "SMTP port must be a positive number" }),
    smtpUser: z.string().min(1, { message: "SMTP user is required" }),
    smtpPassword: z.string().min(1, { message: "SMTP password is required" }),
    smtpSecure: z.boolean().optional(),
    recipientEmail: z.email({ error: "Recipient email must be a valid email address" }),
    emailSubject: z.string().optional(),
});
export const discordSchema = z.object({
    discordWebhookUrl: z.url({ message: "Discord webhook URL must be a valid URL" }),
});
export const slackSchema = z.object({
    slackWebhookUrl: z.url({ message: "Slack webhook URL must be a valid URL" }),
});
export const telegramSchema = z.object({
    telegramBotToken: z.string().min(1, { message: "Telegram bot token is required" }),
    telegramChatId: z.string().min(1, { message: "Telegram chat ID is required" })
});
export const STATUS_CONFIG = {
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
//# sourceMappingURL=types.js.map