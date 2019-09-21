import Router from 'koa-router'
import CardsController from '../controllers/cards-controller'
import CardsValidate from '../schemas/cards-schemas'

const router = new Router()
const ctrl = new CardsController()
const valid = new CardsValidate()

router.get('/cards', ctrl.index)

router.post('/cards', valid.create(), ctrl.create)

router.get('/cards/:id', ctrl.show)
router.put('/cards/:id', valid.update(), ctrl.update)
router.delete('/cards/:id', ctrl.destroy)

export default router.routes()
