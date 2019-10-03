import Router from 'koa-router'
import UserController from '../controllers/users-controller'
import UserValidate from '../schemas/users-schemas'

const router = new Router()
const ctrl = new UserController()
const valid = new UserValidate()

router.get('/users', ctrl.index)

router.post('/users/signup', valid.create(), ctrl.create)
router.post('/users/login', ctrl.login)
router.post('/users/password', ctrl.generateKey)
router.get('/users/password', ctrl.userByToken)

router.get('/users/:id', ctrl.show)
router.put('/users/:id', valid.update(), ctrl.update)
router.delete('/users/:id', ctrl.destroy)

export default router.routes()
