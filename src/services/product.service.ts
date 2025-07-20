import db from '../db/client'
import { products } from '../db/schema'
import { eq } from 'drizzle-orm'

// TypeScript type for returned product
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  return await db.select().from(products)
}

// Get product by ID
export const getProductById = async (id: number): Promise<Product | undefined> => {
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1)
  return result[0]
}

// Create new product
export const createProduct = async (product: NewProduct): Promise<{ id: number }[]> => {
  return await db.insert(products).values(product).$returningId()
}

// Update product
export const updateProduct = async (id: number, updates: Partial<NewProduct>): Promise<void> => {
  await db.update(products).set(updates).where(eq(products.id, id))
}

// Delete product
export const deleteProduct = async (id: number): Promise<void> => {
  await db.delete(products).where(eq(products.id, id))
}
