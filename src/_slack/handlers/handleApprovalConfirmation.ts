import { slackWebApiClient } from "@src/_config/slack.api.config";
import { IReq, IRes } from "@src/routes/common/types";

export const handleApprovalConfirmation = async (payload:any,req:IReq,res:IRes) => {
  const actionId = payload.actions[0].action_id;
  const requesterId = payload.actions[0].value; // Requester ID passed from the button value
  const approverId = payload.user.id;
  const messageTs = payload.message.ts; // Timestamp of the message to update
  const channelId = payload.channel.id; // Channel ID where the message is located

  let responseMessage = "";

  if (actionId === "approve_action") {
    responseMessage = `Your request has been approved! by <@${approverId}>`;
  } else if (actionId === "reject_action") {
    responseMessage = `Your request has been rejected by <@${approverId}>`;
  }

  // Update the original message to remove buttons
  const chatUpdateMessage = `Request is ${
    actionId == "approve_action"
      ? "Approved"
      : actionId == "reject_action"
      ? "Rejected"
      : ""
  } for the user <@${requesterId}>`;
  await slackWebApiClient.chat.update({
    channel: channelId,
    ts: messageTs,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: chatUpdateMessage,
        },
      },
    ],
  });

  // Notify the requester about the decision
  await slackWebApiClient.chat.postMessage({
    channel: requesterId,
    text: responseMessage,
  });

  // Respond to Slack to acknowledge the action
  res.status(200).send();
};
