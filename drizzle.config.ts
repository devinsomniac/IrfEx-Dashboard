import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config(); 

export default defineConfig({
  out: './drizzle',
  schema: './Database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
