import { slackWebApiClient } from "@src/_config/slack.api.config";
import {
  handleApprovalConfirmation,
  handleApprovalView,
} from "@src/_slack/handlers";
import {
  approvalRequestModal,
  getApporovalRequestModal,
  thanksModal,
} from "@src/_slack/views/modals";
import { IReq, IRes } from "@src/routes/common/types";

const index = async (req: IReq, res: IRes) => {
  const modalView = await getApporovalRequestModal(); // getting modal Block-Kit
  const result = await slackWebApiClient.views.open({
    trigger_id: req.body?.trigger_id as string,
    view: modalView,
  });
  res.status(200).send();
};

const events = async (req: IReq, res: IRes) => {
  console.log(req.body);
  // const reqBody=JSON.parse(req.body as string)
  const payload: any = JSON.parse(req.body.payload as string);

  if (
    payload.type === "view_submission" &&
    payload.view.callback_id == "approval_view"
  ) {
    handleApprovalView(payload, req, res); //handle approval Modal view
  } else if (payload.type === "block_actions") {
    if (payload.actions[0].block_id === "approval_buttons") {
      handleApprovalConfirmation(payload, req, res); // handle approval Confirmation view
    }
  }
};

export const slackController = {
  index,
  events,
};
