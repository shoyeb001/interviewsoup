import nodemailer from 'nodemailer';

export class MailService {
    private static transporter: nodemailer.Transporter;

    public static getInstance(): nodemailer.Transporter {
        if (!this.transporter) {
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            });
        }
        return this.transporter;
    }
}