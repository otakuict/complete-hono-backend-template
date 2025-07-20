import { Context } from 'hono'
import * as userService from '../services/userService'

export const getUsers = async (c: Context) => {
  const users = await userService.getAllUsers()
  return c.json(users)
}

export const createUser = async (c: Context) => {
  const body = await c.req.json()
  const name = body.name

  if (!name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const user = await userService.createUser(name)
  return c.json(user, 201)
}
