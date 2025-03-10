import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    v2.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRET,
    });
  },
};