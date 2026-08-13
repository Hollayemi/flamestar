import { v2 as cloudinary } from "cloudinary";

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Add it to your .env.local file.`);
  }
  return value;
}

let configured = false;
function ensureConfigured() {
  if (configured) return;
  cloudinary.config({
    cloud_name: required("CLOUDINARY_CLOUD_NAME"),
    api_key: required("CLOUDINARY_API_KEY"),
    api_secret: required("CLOUDINARY_API_SECRET"),
    secure: true,
  });
  configured = true;
}

const NEWSLETTER_FOLDER = "flamestar/newsletters";

export type UploadedPdf = {
  url: string;
  publicId: string;
  bytes: number;
};

/** Uploads a PDF buffer to Cloudinary as a raw asset and returns its public URL. */
export async function uploadNewsletterPdf(buffer: Buffer, filename: string): Promise<UploadedPdf> {
  ensureConfigured();

  const base64 = buffer.toString("base64");
  const dataUri = `data:application/pdf;base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    resource_type: "raw",
    folder: NEWSLETTER_FOLDER,
    use_filename: true,
    unique_filename: true,
    filename_override: filename,
  });

  return { url: result.secure_url, publicId: result.public_id, bytes: result.bytes };
}

export async function deleteNewsletterPdf(publicId: string) {
  ensureConfigured();
  await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
}

const IMAGE_FOLDER = "flamestar/blog";

export type UploadedImage = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  bytes: number;
};

/** Uploads an image buffer to Cloudinary (used for blog cover images and in-article images). */
export async function uploadImage(
  buffer: Buffer,
  mimeType: string,
  filename: string,
  folder: string = IMAGE_FOLDER
): Promise<UploadedImage> {
  ensureConfigured();

  const base64 = buffer.toString("base64");
  const dataUri = `data:${mimeType};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    resource_type: "image",
    folder,
    use_filename: true,
    unique_filename: true,
    filename_override: filename,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
}

export async function deleteImage(publicId: string) {
  ensureConfigured();
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

/** Builds a download-forcing variant of a Cloudinary delivery URL. */
export function toDownloadUrl(url: string) {
  return url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;
}