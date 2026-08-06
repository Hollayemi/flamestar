import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/email/transporter";
import { emailMapping, defaultSender } from "@/config/emailConfig";
import { ConsultationFormData, NewsletterFormData, FormType } from "@/lib/email/types";
import {
  generateConsultationHTML,
  generateConsultationText,
  generateNewsletterHTML,
  generateNewsletterText,
} from "@/lib/email/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, formData } = body;

    if (!formType || !emailMapping[formType as FormType]) {
      return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
    }

    const validatedData = validateFormData(formType as FormType, formData);
    if (!validatedData.valid) {
      return NextResponse.json({ error: validatedData.error }, { status: 400 });
    }

    const config = emailMapping[formType as FormType];
    const { html, text, subject } = generateEmailContent(formType as FormType, validatedData.data);

    const emailPromises = config.recipients.map((recipient) =>
      transporter.sendMail({
        from: defaultSender,
        to: recipient,
        subject,
        text,
        html,
        // replyTo: getReplyTo(validatedData?.data?.email || ''),
      })
    );

    await Promise.all(emailPromises);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

function validateFormData(formType: FormType, data: any) {
  switch (formType) {
    case "consultation":
      if (!data.name || !data.email || !data.phone || !data.investmentInterest) {
        return { valid: false, error: "Missing required fields for consultation request" };
      }
      return { valid: true, data: data as ConsultationFormData };

    case "newsletter":
      if (!data.name || !data.email) {
        return { valid: false, error: "Missing required fields for newsletter signup" };
      }
      return { valid: true, data: data as NewsletterFormData };

    default:
      return { valid: false, error: "Invalid form type" };
  }
}

function generateEmailContent(formType: FormType, data: any) {
  switch (formType) {
    case "consultation":
      return {
        html: generateConsultationHTML(data),
        text: generateConsultationText(data),
        subject: emailMapping.consultation.subject,
      };
    case "newsletter":
      return {
        html: generateNewsletterHTML(data),
        text: generateNewsletterText(data),
        subject: emailMapping.newsletter.subject,
      };
    default:
      throw new Error("Invalid form type");
  }
}

function getReplyTo(data: { email?: string }): string {
  return data.email || defaultSender || "";
}

export async function GET() {
  return NextResponse.json({ status: "Email API is running" }, { status: 200 });
}
