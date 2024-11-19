import { View, ViewsOpenArguments } from "@slack/web-api";
import { slackWebApiClient } from "@src/_config/slack.api.config";

export const approvalRequestModal: View = {
  type: "modal",
  callback_id: 'approval_view',
  title: {
    type: "plain_text",
    text: "My App",
    emoji: true,
  },
  submit: {
    type: "plain_text",
    text: "Submit",
    emoji: true,
  },
  close: {
    type: "plain_text",
    text: "Cancel",
    emoji: true,
  },
  blocks: [
    {
      type: "input",
      block_id: 'approver_block',
      element: {
        type: "static_select",
        action_id: 'approver_select',
        placeholder: {
          type: "plain_text",
          text: "Select Approver",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "*plain_text option 0*",
              emoji: true,
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text",
              text: "*plain_text option 1*",
              emoji: true,
            },
            value: "value-1",
          },
          {
            text: {
              type: "plain_text",
              text: "*plain_text option 2*",
              emoji: true,
            },
            value: "value-2",
          },
        ],
       
      },
      label: {
        type: "plain_text",
        text: "Select Approver",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: 'approval_text_block',
      element: {
        type: "plain_text_input",
        action_id: "approval_text",
        multiline: true,
        
      },
      label: {
        type: "plain_text",
        text: "Desctiption",
        emoji: true,
      },
    },
  ],
};


export const  getApporovalRequestModal=async()=>{

const users=await _getUsers()

    return {
        type: "modal",
        callback_id: 'approval_view',
        title: {
          type: "plain_text",
          text: "My App",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        blocks: [
          {
            type: "input",
            block_id: 'approver_block',
            element: {
              type: "static_select",
              action_id: 'approver_select',
              placeholder: {
                type: "plain_text",
                text: "Select Approver",
                emoji: true,
              },
              options: users,
             
            },
            label: {
              type: "plain_text",
              text: "Select Approver",
              emoji: true,
            },
          },
          {
            type: "input",
            block_id: 'approval_text_block',
            element: {
              type: "plain_text_input",
              action_id: "approval_text",
              multiline: true,
              
            },
            label: {
              type: "plain_text",
              text: "Desctiption",
              emoji: true,
            },
          },
        ],
      }as View


}


async function _getUsers() {
    try {
      const result = await slackWebApiClient.users.list({});
      if (result.members) {
        return result.members
          .filter(member => !member.is_bot && member.id !== 'USLACKBOT' && member.deleted === false)
          .map(member => ({
            text: {
              type: 'plain_text',
              text: member.real_name || member.name,
              emoji: true,
            },
            value: member.id, // Use the user ID as the value
          }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
