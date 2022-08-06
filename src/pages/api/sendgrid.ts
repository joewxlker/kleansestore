import { MailDataRequired } from "@sendgrid/mail";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { sendgrid } from "../../server/api's/sendgrid";

export const sendEmail: NextApiHandler = (Request: NextApiRequest, Response: NextApiResponse) => {

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

    const msg: MailDataRequired = {
        to: Request.body.email,
        from: process.env.EMAIL!,
        subject: 'Please verify your new kleanse online shopping account',
        text: ''
    }
    sendgrid
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error: string) => {
            console.log(error)
        })
}

