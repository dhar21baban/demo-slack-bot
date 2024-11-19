import { slackController } from "@src/controllers";
import { Router } from "express";

 const slackRouter=Router()

 slackRouter.post('/approval-test',slackController.index)
 slackRouter.post('/events',slackController.events)


 export default slackRouter