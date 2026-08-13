export const emailConfig = {
  host: process.env.SMTP_HOST || "smtp.zoho.eu",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const defaultSender = process.env.EMAIL_USER;

// Email routing for each form type
export const emailMapping = {
  consultation: {
    recipients: (process.env.CONSULTATION_RECIPIENTS || "notification@flamestarcapital.com").split(","),
    subject: "New Consultation Request",
  },
  newsletter: {
    recipients: (process.env.NEWSLETTER_RECIPIENTS || "mimi@flamestarcapital.com").split(","),
    subject: "New Newsletter Subscriber",
  },
};