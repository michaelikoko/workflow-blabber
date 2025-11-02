import { STATUS_CONFIG, type StatusConfigObj, type Notification } from "../types";

export function buildFallbackHtml(notification: Notification): string {
  const config: StatusConfigObj = STATUS_CONFIG[notification.status];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Workflow Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f6f8fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f8fa;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #24292f; padding: 30px 20px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                ${config.emoji} ${notification.title}
              </h1>
              <p style="margin: 10px 0 0 0; color: #8b949e; font-size: 14px;">
                ${notification.workflow}
              </p>
            </td>
          </tr>
          
          <!-- Status Banner -->
          <tr>
            <td style="background-color: ${config.bannerBg}; padding: 15px 20px; text-align: center;">
              <p style="margin: 0; color: ${config.color}; font-size: 16px; font-weight: 600;">
                ${notification.message}
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px 40px;">
              
              <!-- Repository -->
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #24292f; font-size: 14px;">
                Repository
              </p>
              <p style="margin: 0 0 20px 0; color: #0969da; font-size: 14px;">
                <a href="${notification.repositoryUrl}" style="color: #0969da; text-decoration: none;">
                  ${notification.repositoryUrl}
                </a>
              </p>
              
              <!-- Branch -->
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #24292f; font-size: 14px;">
                Branch
              </p>
              <p style="margin: 0 0 20px 0; color: #24292f; font-size: 14px;">
                ${notification.branch}
              </p>
              
              <!-- Workflow -->
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #24292f; font-size: 14px;">
                Workflow
              </p>
              <p style="margin: 0 0 20px 0; color: #24292f; font-size: 14px;">
                ${notification.workflow}
              </p>
              
              <!-- Event -->
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #24292f; font-size: 14px;">
                Event
              </p>
              <p style="margin: 0 0 20px 0; color: #24292f; font-size: 14px;">
                ${notification.event}
              </p>
              
              <!-- Commit Message -->
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #24292f; font-size: 14px;">
                Commit
              </p>
              <p style="margin: 0 0 5px 0; color: #24292f; font-size: 14px;">
                ${notification.commitMessage}
              </p>
              <p style="margin: 0 0 20px 0; color: #57606a; font-size: 13px;">
                ${notification.commitHash}
              </p>
              
              <!-- Triggered By -->
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #24292f; font-size: 14px;">
                Triggered by
              </p>
              <p style="margin: 0 0 20px 0; color: #24292f; font-size: 14px;">
                @${notification.actor}
              </p>
              
              <!-- Timestamp -->
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #24292f; font-size: 14px;">
                Executed at
              </p>
              <p style="margin: 0 0 30px 0; color: #24292f; font-size: 14px;">
                ${notification.date} at ${notification.time}
              </p>
              
              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${notification.actionUrl}" style="display: inline-block; background-color: ${config.buttonColor}; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                      View Workflow Run
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f6f8fa;">
              <p style="margin: 0 0 5px 0; color: #57606a; font-size: 12px;">
                Sent by workflow-blabber
              </p>
              <p style="margin: 0; color: #57606a; font-size: 12px;">
                Automated GitHub Actions notification
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}