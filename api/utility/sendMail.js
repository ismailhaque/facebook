import nodemailer from 'nodemailer'

/**
 * @name mail send
 * @param {*} to 
 * @param {*} subject 
 * @param {*} msg 
 * @param {*} next 
 */

export const sendMail = async (to, subject, msg, next) => {

    try {

        let transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_KEY
            }
        });

        await transport.sendMail({

            from: `Facebook<${process.env.MAIL_ID}>`,
            subject: subject,
            to: to,
            html: msg

        })

    } catch (error) {
        next(error);
    }

}