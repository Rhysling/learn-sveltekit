export interface ImageMetadata {
  filename: string;
  url: string;
}

export interface ImageListResponse {
  images: ImageMetadata[];
}

export interface ImageUploadResponse {
  message: string;
  filename: string;
  url: string;
}
