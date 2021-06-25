import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController'
import { ListUserSenderComplimentsController } from './controllers/ListUserSenderComplimentsController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUserController } from './controllers/ListUserController'

import { admin } from './middlewares/admin'
import { auth } from './middlewares/auth'

const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController()
const listUserSenderComplimentsController = new ListUserSenderComplimentsController()
const listTagsController = new ListTagsController()
const listUserController = new ListUserController()

router.get('/users/compliments/send', auth, listUserSenderComplimentsController.handle)
router.get('/users/compliments/receive', auth, listUserReceivedComplimentsController.handle)
router.get('/tags/', auth, listTagsController.handle)
router.get('/users', auth, listUserController.handle)

router.post('/auth', authUserController.handle)
router.post('/users', createUserController.handle)
router.post('/tags', auth, admin, createTagController.handle)
router.post("/compliments", auth, createComplimentController.handle)

export { router }
