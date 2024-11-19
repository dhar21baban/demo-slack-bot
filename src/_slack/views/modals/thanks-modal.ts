import { View } from "@slack/web-api";

export const thanksModal = async () => {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Request Sent",
    },
    close: {
      type: "plain_text",
      text: "Close",
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Your approval request has been sent to the approver.",
        },
      },
    ],
  }as View;
};
