import { slackWebApiClient } from "@src/_config/slack.api.config";
import { IReq, IRes } from "@src/routes/common/types";
import { thanksModal } from "../views/modals";

export const handleApprovalView=async(payload:any,req:IReq,res:IRes)=>{
    console.log('from handler',payload);
    

     // Extract data from submission
     const submittedData = payload.view.state.values;
     const approverId =
       submittedData["approver_block"]["approver_select"]["selected_option"]
         .value;
     const approvalText =
       submittedData["approval_text_block"]["approval_text"].value;
     const requesterId = payload.user.id; // ID of the requester
 
     // Acknowledge the view submission and close the current modal
     res.status(200).json({
       response_action: "clear",
     });
 
     // Open a new modal saying "Your request has been sent"
     await slackWebApiClient.views.open({
       trigger_id: payload.trigger_id,
       view: await thanksModal(),
     });
 
     console.log({ approverId });
 
     // Send a DM to the approver with Approve/Reject buttons
     await slackWebApiClient.chat.postMessage({
       channel: approverId,
       text: `You have a new approval request from <@${requesterId}>: ${approvalText}`,
       blocks: [
         {
           type: "section",
           text: {
             type: "mrkdwn",
             text: `*Approval Request from <@${requesterId}>*\n${approvalText}`,
           },
         },
         {
           type: "actions",
           block_id: "approval_buttons",
           elements: [
             {
               type: "button",
               text: {
                 type: "plain_text",
                 text: "Approve",
               },
               style: "primary",
               action_id: "approve_action",
               value: requesterId, // Send the requester's ID for reference
             },
             {
               type: "button",
               text: {
                 type: "plain_text",
                 text: "Reject",
               },
               style: "danger",
               action_id: "reject_action",
               value: requesterId, // Send the requester's ID for reference
             },
           ],
         },
       ],
     });
}