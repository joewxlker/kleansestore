require('dotenv').config();
import * as sgMail from "@sendgrid/mail";

declare global {
    var sendGrid: sgMail.MailService;
}

export const sendgrid: sgMail.MailService = sgMail;