import path from 'node:path';
import { getEnvVar } from '../utils/getEnvVar.js';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;

const ONE_DAY = 24 * 60 * 60 * 1000;

export const THIRTY_DAYS = 30 * ONE_DAY;

export const SMTP = {
  SMTP_HOST: getEnvVar('SMTP_HOST'),
  SMTP_PORT: getEnvVar('SMTP_PORT'),
  SMTP_USER: getEnvVar('SMTP_USER'),
  SMTP_PASSWORD: getEnvVar('SMTP_PASSWORD'),
  SMTP_FROM: getEnvVar('SMTP_FROM'),
};
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  API_KEY: getEnvVar ('CLOUDINARY_API_KEY'),
  API_SECRET: getEnvVar('CLOUDINARY_API_SECRET'),
};
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.yaml');




