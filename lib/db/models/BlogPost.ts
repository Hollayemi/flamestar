import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// Mirrors the ArticleBlock union in components/section/insight/ArticleBody.tsx
const BlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["heading", "paragraph", "subheading", "quote", "image"],
      required: true,
    },
    text: { type: String }, // used by heading / paragraph / subheading / quote
    count: { type: Number }, // used by subheading (numbered sections)
    src: { type: String }, // used by image
    alt: { type: String }, // used by image
  },
  { _id: false }
);

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    author: { type: String, default: "Flamestar Capital" },
    readTime: { type: String, default: "3 mins read" },
    tags: { type: [String], default: [] },
    content: { type: [BlockSchema], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export type BlogPostDoc = InferSchemaType<typeof BlogPostSchema>;

export const BlogPost: Model<BlogPostDoc> =
  (models.BlogPost as Model<BlogPostDoc>) || model<BlogPostDoc>("BlogPost", BlogPostSchema);
