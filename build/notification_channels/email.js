import nodemailer from 'nodemailer';
import buildEmailHtml from '../utils/buildEmailHtml.js';
export async function sendEmail(notification, emailConfig) {
    const transporter = nodemailer.createTransport({
        host: emailConfig.smtpHost,
        port: emailConfig.smtpPort,
        secure: emailConfig.smtpSecure || false,
        auth: {
            user: emailConfig.smtpUser,
            pass: emailConfig.smtpPassword
        }
    });
    try {
        // Verify connection configuration
        await transporter.verify();
        await transporter.sendMail({
            from: emailConfig.smtpUser,
            to: emailConfig.recipientEmail,
            subject: emailConfig.emailSubject || `GitHub Workflow Notification: ${notification.title}`,
            html: buildEmailHtml(notification)
        });
    }
    catch (error) {
        throw new Error(`${error instanceof Error ? error.message : String(error)}`);
    }
}
//# sourceMappingURL=email.js.map