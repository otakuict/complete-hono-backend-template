import { Context, Hono } from 'hono'
import * as productService from '../services/product.service'


const productRoutes = new Hono()

productRoutes.get('/list', getProducts)
productRoutes.post('/', createProduct)

async function getProducts  (c: Context)  {
  const products = await productService.getAllProducts()

  return c.json(products)
}

async function createProduct  (c: Context)  {
  const body = await c.req.json()
  const { name, price } = body

  if (!name || typeof price !== 'number') {
    return c.json({ error: 'Invalid input' }, 400)
  }

  const result = await productService.createProduct({ name, price })
  return c.json(result[0], 201)
}

export default productRoutes