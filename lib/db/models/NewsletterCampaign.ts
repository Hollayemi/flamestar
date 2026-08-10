import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const IndicatorRowSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    note: { type: String },
  },
  { _id: false }
);

const BlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["paragraph", "heading", "subheading", "table", "list", "quote"],
      required: true,
    },
    text: { type: String }, // paragraph / heading / subheading / quote
    title: { type: String }, // table
    rows: { type: [IndicatorRowSchema], default: undefined }, // table
    items: { type: [String], default: undefined }, // list
  },
  { _id: false }
);

const NewsletterCampaignSchema = new Schema(
  {
    subject: { type: String, required: true, trim: true },
    dateLine: { type: String, default: "" }, // e.g. "Monday, August 3, 2026"
    intro: { type: String, default: "" }, // "From the desk of Flamestar Capital" paragraph
    blocks: { type: [BlockSchema], default: [] },
    status: {
      type: String,
      enum: ["draft", "sending", "sent", "failed"],
      default: "draft",
    },
    zohoCampaignKey: { type: String },
    error: { type: String },
    sentAt: { type: Date },
  },
  { timestamps: true }
);

export type NewsletterCampaignDoc = InferSchemaType<typeof NewsletterCampaignSchema>;

export const NewsletterCampaign: Model<NewsletterCampaignDoc> =
  (models.NewsletterCampaign as Model<NewsletterCampaignDoc>) ||
  model<NewsletterCampaignDoc>("NewsletterCampaign", NewsletterCampaignSchema);
