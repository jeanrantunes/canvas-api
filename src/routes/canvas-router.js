import Router from 'koa-router'
import CanvasController from '../controllers/canvas-controller'
import CanvasValidate from '../schemas/canvas-schemas'

const router = new Router()
const ctrl = new CanvasController()
const valid = new CanvasValidate()

router.get('/canvas', ctrl.index)

router.post('/canvas', valid.create(), ctrl.create)

router.get('/canvas/:id', ctrl.show)
router.put('/canvas/:id', valid.update(), ctrl.update)
router.delete('/canvas/:id', ctrl.destroy)

export default router.routes()
