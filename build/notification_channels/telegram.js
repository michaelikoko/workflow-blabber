import axios from "axios";
import { STATUS_CONFIG } from "../types.js";
export async function sendTelegramMessage(notification, telegramConfig) {
    const config = STATUS_CONFIG[notification.status];
    const message = `
    ${config.emoji} *${notification.title}*
    ${notification.message}
    
    *Repository:* ${notification.repositoryUrl}
    *Workflow:* ${notification.workflow}
    *Branch:* ${notification.branch}
    *Event:* ${notification.event}
    *Commit Message:* ${notification.commitMessage}
    *Commit Hash:* ${notification.commitHash}
    *Actor:* ${notification.actor}
    *Date:* ${notification.date}
    *Time:* ${notification.time}
    
    [View Workflow Run](${notification.actionUrl})
    `.trim();
    try {
        await axios.post(`https://api.telegram.org/bot${telegramConfig.telegramBotToken}/sendMessage`, {
            chat_id: telegramConfig.telegramChatId,
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
    }
    catch (error) {
        throw new Error(`${error instanceof Error ? error.message : String(error)}`);
    }
}
//# sourceMappingURL=telegram.js.map