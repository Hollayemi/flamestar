import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const NewsletterIssueSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    datePublished: { type: Date, required: true },
    pdfUrl: { type: String, required: true },
    pdfPublicId: { type: String, required: true },
    fileSize: { type: Number }, // bytes
  },
  { timestamps: true }
);

export type NewsletterIssueDoc = InferSchemaType<typeof NewsletterIssueSchema>;

export const NewsletterIssue: Model<NewsletterIssueDoc> =
  (models.NewsletterIssue as Model<NewsletterIssueDoc>) ||
  model<NewsletterIssueDoc>("NewsletterIssue", NewsletterIssueSchema);
