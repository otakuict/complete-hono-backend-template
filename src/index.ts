import { Hono } from 'hono'
import api from './routes/index'
import db from './db/client'
import { products } from './db/schema'
import { cors } from 'hono/cors'
import { customLogger } from './middleware/inboundLogger'


const app = new Hono()
//todo add cors for api routes


app.use('/api/*', cors({ origin: '*' })) // cors first
app.use('*', customLogger) // logger first
app.route('/api', api)     // routes second

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