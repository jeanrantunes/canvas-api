import Canvas from '../../database/models/Canvas'
import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '../utils'

export default class Controller {
  async index (ctx) {
    const canvas = await new Canvas()
      .where('user_id',  ctx.state.user.sub.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })
     
    ctx.body = canvas
  }

  async show (ctx) {
    const canvas = await new Canvas({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })
    
    ctx.body = canvas
  }

  async create (ctx) {
    const { body } = ctx.request

    const canvas = await new Canvas({
      title: body.title,
      description: body.description,
      user_id: ctx.state.user.sub.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = await new Canvas({ id: canvas.attributes.id })
      .fetch()
      .catch(err => { throw new InternalServerError(err.toString()) })
  }

  async update (ctx) {
    const { body } = ctx.request

    const canvas = await new Canvas({ id: ctx.params.id })
      .save({
        title: body.title,
        description: body.description,
        user_id: ctx.state.user.sub.id
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = canvas
  }

  async destroy (ctx) {
    await new Canvas({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
