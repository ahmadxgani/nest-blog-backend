import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FileUploadCreateReadStream } from 'graphql-upload/processRequest.js';
import sharp from 'sharp';
import { Stream } from 'stream';
import FormData from 'form-data';

@Injectable()
export class ImageService {
  async Upload(createReadStream: FileUploadCreateReadStream): Promise<any> {
    async function uploader(fileStream: Stream): Promise<any> {
      return new Promise(async (resolve, reject) => {
        const formData = new FormData();

        formData.append('image', fileStream, 'test.jpg');
        try {
          const uploadStream = await axios.post(
            `${process.env.API_URI}?key=${process.env.API_KEY}`,
            formData,
            {
              headers: formData.getHeaders(),
            },
          );
          const data = uploadStream.data.data;
          if (uploadStream.data.status === 200) {
            resolve({
              status: uploadStream.data.status,
              url: data.url,
              delete: data.delete_url,
            });
          } else {
            throw new Error('Failed to Upload');
          }
        } catch (error) {
          reject(error);
        }

        // const pipeline = sharp();
        // pipeline.resize(500).webp().pipe(fileStream);

        // fileStream.pipe(pipeline);
      });
    }

    return uploader(createReadStream());
  }
}
