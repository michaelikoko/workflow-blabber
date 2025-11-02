import { STATUS_CONFIG, type StatusConfigObj, type Notification } from "../types";
import mjml2html from 'mjml';
import { MJML_EMAIL_TEMPLATE } from "./emailTemplate";
import { buildFallbackHtml } from "./buildFallbackHtml";

export default function buildEmailHtml(notification: Notification): string {
  const config: StatusConfigObj = STATUS_CONFIG[notification.status];

  const mjmlTemplate = MJML_EMAIL_TEMPLATE;
  const emailContent = mjmlTemplate
    .replace(/{{STATUS_EMOJI}}/g, config.emoji)
    .replace(/{{STATUS_TEXT}}/g, notification.title)
    .replace(/{{STATUS_COLOR}}/g, config.color)
    .replace(/{{BANNER_BG}}/g, config.bannerBg)
    .replace(/{{BANNER_MESSAGE}}/g, notification.message)
    .replace(/{{BUTTON_COLOR}}/g, config.buttonColor)
    .replace(/{{WORKFLOW_NAME}}/g, notification.workflow)
    .replace(/{{REPO_NAME}}/g, notification.repositoryUrl)
    .replace(/{{REPO_URL}}/g, notification.repositoryUrl)
    .replace(/{{BRANCH}}/g, notification.branch)
    .replace(/{{EVENT}}/g, notification.event)
    .replace(/{{COMMIT_MESSAGE}}/g, notification.commitMessage)
    .replace(/{{COMMIT_HASH}}/g, notification.commitHash)
    .replace(/{{ACTOR}}/g, notification.actor)
    .replace(/{{TIMESTAMP}}/g, `${notification.date} at ${notification.time}`)
    .replace(/{{ACTION_URL}}/g, notification.actionUrl);

  // Convert MJML to HTML
  const { html, errors } = mjml2html(emailContent) as { html: string; errors: Array<{ message: string }> };

  if (errors.length > 0) {
    console.error("MJML errors found:", errors);
    console.error("Falling back to basic HTML email template.");
    return buildFallbackHtml(notification);
  }

  return html;
}