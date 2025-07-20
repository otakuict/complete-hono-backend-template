import { Hono } from 'hono'
import userRoutes from './user.Route'
import { healthRoutes } from './health.route'
import productRoutes from './product.route'
// import postRoutes from './postRoutes' // example

const api = new Hono()

api.route('/users', userRoutes)
api.route('/health', healthRoutes) // Assuming healthRoutes is defined in health.route.ts
api.route('/products', productRoutes)

export default api
