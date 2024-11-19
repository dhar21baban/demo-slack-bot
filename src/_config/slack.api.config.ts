import { WebClient } from "@slack/web-api";
require('dotenv').config()

const token=process.env.SLACK_TOKEN

console.log({token});


export const slackWebApiClient=new WebClient(token)