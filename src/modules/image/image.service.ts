import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import { FileUploadCreateReadStream } from 'graphql-upload/processRequest.js';
import sharp from 'sharp';
import type { Stream } from 'stream';

const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

@Injectable()
export class ImageService {
  async Upload(createReadStream: FileUploadCreateReadStream): Promise<any> {
    v2.config(cloudinaryConfig);

    async function uploader(fileStream: Stream): Promise<UploadApiResponse> {
      return new Promise(async (resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream(
          {
            folder: 'public',
          },
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result as UploadApiResponse);
          },
        );
        const pipeline = sharp();
        pipeline.resize(500).webp().pipe(uploadStream);

        fileStream.pipe(pipeline);
      });
    }

    return uploader(createReadStream());
  }
}
