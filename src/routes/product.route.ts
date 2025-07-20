import { Hono } from 'hono'
import * as productController from '../controllers/product.controller'

const productRoutes = new Hono()

productRoutes.get('/', productController.getProducts)
productRoutes.post('/', productController.createProduct)

export default productRoutes
