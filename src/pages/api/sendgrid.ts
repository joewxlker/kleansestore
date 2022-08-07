import { MailDataRequired } from "@sendgrid/mail";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { sendgrid } from "../../server/api's/sendgrid";

const sendEmail: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)
    try {
        const contact: MailDataRequired = {
            to: 'fabkwi77@gmail.com',
            from: process.env.EMAIL!,
            subject: ` New customer contact email sent from ${req.body.email}`,
            text: `hello, ${req.body.message} Sent from Kleanse Website`
        }
        //TODO add request params and conditional email templates
        const result = await sendgrid.send(contact)
        res.status(result[0].statusCode).send(true)
    } catch (err) {
        res.status(400).send(err)
    }
}

export default sendEmail

