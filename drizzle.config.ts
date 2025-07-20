import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.ts",
  out: "./src/migrations/drizzle",
 dbCredentials: {
    host: process.env.DB_HOST || '',
    port: +(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || '' ,
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || ''
  }
  
});
  