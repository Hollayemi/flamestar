import { ConsultationFormData, NewsletterFormData } from "./types";

// Shared base styles for all outgoing emails
const baseStyles = `
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    line-height: 1.6;
    color: #16171b;
    margin: 0;
    padding: 0;
    background-color: #f4f4f2;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .header {
    background: #16171b;
    color: #f4f4f2;
    padding: 28px 30px;
    text-align: center;
    border-radius: 8px 8px 0 0;
  }
  .header h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }
  .header .subtitle {
    margin-top: 6px;
    font-size: 13px;
    opacity: 0.75;
    font-weight: 300;
  }
  .content {
    padding: 30px 10px;
  }
  .field {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  .field:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .label {
    font-weight: 600;
    color: #6b6b6b;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 3px;
  }
  .value {
    margin-top: 3px;
    font-size: 15px;
    color: #16171b;
    word-wrap: break-word;
  }
  .contact-link {
    color: #d6541e;
    text-decoration: none;
  }
  .message-box {
    background: #f9f9f7;
    border-radius: 6px;
    padding: 12px 14px;
    white-space: pre-wrap;
  }
`;

// ---------- Consultation ----------

export const generateConsultationHTML = (data: ConsultationFormData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${baseStyles}</style>
      </head>
      <body style="padding: 20px; background: #f4f4f2;">
        <div class="container">
          <div class="header">
            <h1>New Consultation Request</h1>
            <div class="subtitle">A prospective client has requested a consultation</div>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Full Name</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${data.email}" class="contact-link">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value"><a href="tel:${data.phone}" class="contact-link">${data.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Investment Interest</div>
              <div class="value">${data.investmentInterest}</div>
            </div>
            <div class="field" style="border-bottom: none; padding-bottom: 0; margin-bottom: 0;">
              <div class="label">Message</div>
              <div class="value"><div class="message-box">${data.message}</div></div>
            </div>
            ${
              data.source
                ? `<div class="field" style="margin-top: 16px;"><div class="label">How they heard about us</div><div class="value">${data.source}</div></div>`
                : ""
            }
          </div>
        </div>
      </body>
    </html>
  `;
};

export const generateConsultationText = (data: ConsultationFormData): string => {
  return `
NEW CONSULTATION REQUEST
=========================
Received: ${new Date().toLocaleString("en-GB")}

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Investment Interest: ${data.investmentInterest}
${data.source ? `Source: ${data.source}\n` : ""}
Message:
${data.message}

---
This is an automated notification from Flamestar Capital
  `;
};

// ---------- Newsletter ----------

export const generateNewsletterHTML = (data: NewsletterFormData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${baseStyles}</style>
      </head>
      <body style="padding: 20px; background: #f4f4f2;">
        <div class="container">
          <div class="header">
            <h1>New Newsletter Subscriber</h1>
            <div class="subtitle">Someone signed up for market insights</div>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Full Name</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field" style="border-bottom: none; padding-bottom: 0; margin-bottom: 0;">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${data.email}" class="contact-link">${data.email}</a></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const generateNewsletterText = (data: NewsletterFormData): string => {
  return `
NEW NEWSLETTER SUBSCRIBER
==========================
Received: ${new Date().toLocaleString("en-GB")}

Name: ${data.name}
Email: ${data.email}

---
This is an automated notification from Flamestar Capital
  `;
};
