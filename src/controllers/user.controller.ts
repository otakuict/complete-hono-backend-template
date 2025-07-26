import { Context, Hono } from 'hono'
import * as userService from '../services/userService'
const userRoutes = new Hono()

userRoutes.get('/list', getUsers)
userRoutes.post('/users', createUser)

async function getUsers  (c: Context)  {
  const users = await userService.getAllUsers()

  return c.json(users)
}

async function createUser (c: Context)  {
  const body = await c.req.json()
  const name = body.name

  if (!name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const user = await userService.createUser(name)
  return c.json(user, 201)
}
export default userRoutes