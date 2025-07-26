import { Hono } from 'hono'
import userRoutes from '../controllers/user.controller'
import { healthRoutes } from './health.route'
import productRoutes from '../controllers/product.controller'
 import voiceRoutes from '../controllers/voice.controller' // Uncomment if you want to use voice routes
// import postRoutes from './postRoutes' // example

const api = new Hono()

api.route('/users', userRoutes)
api.route('/products', productRoutes)
api.route('/health', healthRoutes)
api.route('/voice', voiceRoutes) // Uncomment if you want

export default api
