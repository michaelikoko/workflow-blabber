export const MJML_EMAIL_TEMPLATE: string = `
<mjml>
  <mj-head>
    <mj-title>GitHub Workflow Notification</mj-title>
    <mj-attributes>
      <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" />
      <mj-text font-size="14px" color="#24292f" line-height="1.6" />
      <mj-section padding="0px" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f6f8fa">
    <!-- Header -->
    <mj-section background-color="#24292f" padding="20px">
      <mj-column>
        <mj-text align="center" color="#ffffff" font-size="24px" font-weight="bold">
          {{STATUS_EMOJI}} {{STATUS_TEXT}}
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Status Banner -->
    <mj-section background-color="{{BANNER_BG}}" padding="15px">
      <mj-column>
        <mj-text align="center" font-size="16px" font-weight="600" color="{{STATUS_COLOR}}">
          {{BANNER_MESSAGE}}
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Main Content -->
    <mj-section background-color="#ffffff" padding="30px 20px">
      <mj-column>
        <!-- Repository Info -->
        <mj-text font-weight="600" padding-bottom="5px">
          Repository
        </mj-text>
        <mj-text color="#0969da" padding-bottom="20px">
          <a href="{{REPO_URL}}" style="color: #0969da; text-decoration: none;">
            {{REPO_NAME}}
          </a>
        </mj-text>

        <!-- Branch -->
        <mj-text font-weight="600" padding-bottom="5px">
          Branch
        </mj-text>
        <mj-text padding-bottom="20px">
          {{BRANCH}}
        </mj-text>

        <!-- Workflow -->
        <mj-text font-weight="600" padding-bottom="5px">
          Workflow
        </mj-text>
        <mj-text padding-bottom="20px">
          {{WORKFLOW_NAME}}
        </mj-text>

        <!-- Event -->
        <mj-text font-weight="600" padding-bottom="5px">
          Event
        </mj-text>
        <mj-text padding-bottom="20px">
          {{EVENT}}
        </mj-text>

        <!-- Commit Message -->
        <mj-text font-weight="600" padding-bottom="5px">
          Commit
        </mj-text>
        <mj-text padding-bottom="5px">
          {{COMMIT_MESSAGE}}
        </mj-text>
        <mj-text color="#57606a" font-size="13px" padding-bottom="20px">
          {{COMMIT_HASH}}
        </mj-text>

        <!-- Triggered By -->
        <mj-text font-weight="600" padding-bottom="5px">
          Triggered by
        </mj-text>
        <mj-text padding-bottom="20px">
          @{{ACTOR}}
        </mj-text>

        <!-- Timestamp -->
        <mj-text font-weight="600" padding-bottom="5px">
          Executed at
        </mj-text>
        <mj-text padding-bottom="30px">
          {{TIMESTAMP}}
        </mj-text>

        <!-- Action Button -->
        <mj-button background-color="{{BUTTON_COLOR}}" color="#ffffff" font-weight="600" border-radius="6px" href="{{ACTION_URL}}" padding="15px 0px">
          View Workflow Run
        </mj-button>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section padding="20px">
      <mj-column>
        <mj-text align="center" color="#57606a" font-size="12px">
          Sent by workflow-blabber
        </mj-text>
        <mj-text align="center" color="#57606a" font-size="12px">
          Automated GitHub Actions notification
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

