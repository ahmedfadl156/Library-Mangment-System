import { Client } from "@upstash/workflow";
import config from "./config";
import emailjs from "@emailjs/nodejs";


const client = new Client({
    url: config.env.qstashUrl,
    token: config.env.qstashToken,
})

export async function sendEmail({message , subject , email}: {message: string, subject: string ,  email: string}) {
  try {
    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    });

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        to_email: email,
        subject: subject,
        message: message,
      }
    );

    console.log(`Email sent successfully to ${email}:`, response);
    return response;
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    throw error;
  }
}
