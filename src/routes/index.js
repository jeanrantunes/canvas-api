import Router from 'koa-router'
import users from './users-router'
import roles from './roles-router'
import me from './me-router'
import canvas from './canvas-router'
import cards from './cards-router'
import postits from './postits-router'

const router = new Router()
const api = new Router()

api.use(users)
api.use(roles)
api.use(me)
api.use(canvas)
api.use(cards)
api.use(postits)

router.use('/v1', api.routes())

export default router
