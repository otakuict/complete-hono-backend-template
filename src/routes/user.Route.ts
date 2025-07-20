import { Hono } from 'hono'
import * as userController from '../controllers/user.controller'

const userRoutes = new Hono()

userRoutes.get('/users', userController.getUsers)
userRoutes.post('/users', userController.createUser)

export default userRoutes
