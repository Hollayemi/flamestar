import nodemailer from "nodemailer";
import { emailConfig } from "@/config/emailConfig";

export const transporter = nodemailer.createTransport(emailConfig);

// Verify transporter connection (useful for a health-check route or startup log)
export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("SMTP connection established successfully");
    return true;
  } catch (error) {
    console.error("SMTP connection failed:", error);
    return false;
  }
};
