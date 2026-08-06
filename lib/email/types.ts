export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  investmentInterest: string;
  message: string;
  source?: string;
}

export interface NewsletterFormData {
  name: string;
  email: string;
}

export type FormType = "consultation" | "newsletter";
