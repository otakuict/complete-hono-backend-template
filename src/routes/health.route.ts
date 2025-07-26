
// old style route for refference
import { Hono } from 'hono'
import * as healthController  from '../controllers/health.controller'


export const healthRoutes = new Hono()



healthRoutes.get('/', healthController.healthCheck)