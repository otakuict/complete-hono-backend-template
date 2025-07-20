import { Hono } from 'hono'
import api from './routes/index'
import db from './db/client'
import { products } from './db/schema'


const app = new Hono()

app.route('/api', api)  // All routes are now under /api

const port = Number(process.env.PORT) || 3000


const startServer = async () => {
  try {
    await db.select().from(products).limit(1)
    console.log('✅ MySQL connection OK')

    Bun.serve({ fetch: app.fetch, port })
    console.log(`🚀 Server running at http://localhost:${port}/api`)
  } catch (err) {
    console.error('❌ Failed to connect to MySQL:', err)
    process.exit(1)
  }
}

startServer()