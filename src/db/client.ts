import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  database: process.env.DB_NAME || '',
  password: process.env.DB_PASS || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Wrap the query method to log SQL and params
const originalQuery = poolConnection.query.bind(poolConnection);

// Overload signatures to match mysql2 types
poolConnection.query = function <T extends mysql.RowDataPacket = any>(
  sqlOrOptions: string | mysql.QueryOptions,
  values?: any
): Promise<[T[], mysql.FieldPacket[]]> {
  console.log('[MySQL Query]:', sqlOrOptions);
  if (values) console.log('[Params]:', values);
  // @ts-ignore
  return originalQuery(sqlOrOptions, values);
};

const db = drizzle(poolConnection);
export default db;
