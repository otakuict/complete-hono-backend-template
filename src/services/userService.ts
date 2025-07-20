import db from '../db/client'
import { users } from '../db/schema'

export const getAllUsers = async () => {
 
  return db.select().from(users)
}

export const createUser = async (name:string) => {
 return db.insert(users).values({  name })
}
