import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
const poolConnection = mysql.createPool({
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  database: process.env.DB_NAME || '',
  password: process.env.DB_PASS || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
 const db = drizzle({ client: poolConnection });
 export default db