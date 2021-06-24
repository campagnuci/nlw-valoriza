import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'

import { auth } from './middlewares/auth'

const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()


router.post('/auth', authUserController.handle)
router.post('/users', createUserController.handle)
router.post('/tags', auth, createTagController.handle)
router.post("/compliments", createComplimentController.handle)

export { router }
