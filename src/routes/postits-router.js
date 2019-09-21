import Router from 'koa-router'
import PostitsController from '../controllers/postits-controller'
import PostitsValidate from '../schemas/postits-schemas'

const router = new Router()
const ctrl = new PostitsController()
const valid = new PostitsValidate()

router.get('/postits', ctrl.index)

router.post('/postits', valid.create(), ctrl.create)

router.get('/postits/:id', ctrl.show)
router.put('/postits/:id', valid.update(), ctrl.update)
router.delete('/postits/:id', ctrl.destroy)

export default router.routes()
