import { Context } from 'hono'
import * as productService from '../services/product.service'

export const getProducts = async (c: Context) => {
  const products = await productService.getAllProducts()
  console.log("🚀 ~ getProducts ~ products:", products)
  return c.json(products)
}

export const createProduct = async (c: Context) => {
  const body = await c.req.json()
  const { name, price } = body

  if (!name || typeof price !== 'number') {
    return c.json({ error: 'Invalid input' }, 400)
  }

  const result = await productService.createProduct({ name, price })
  return c.json(result[0], 201)
}
