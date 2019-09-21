import Cards from '../../database/models/Cards'
import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '../utils'

export default class Controller {
  async index (ctx) {
    const cards = await new Cards()
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = cards.models.filter(c => c.attributes.canvas_id === ctx.query.canvas)
  }

  async show (ctx) {
    const cards = await new Cards({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = cards
  }

  async create (ctx) {
    const { body } = ctx.request

    const cards = await new Cards({
      title: body.title,
      color: body.color,
      order: body.order,
      canvas_id: body.canvas_id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = await new Cards({ id: cards.attributes.id })
      .fetch()
      .catch(err => { throw new InternalServerError(err.toString()) })
  }

  async update (ctx) {
    const { body } = ctx.request

    const cards = await new Cards({ id: ctx.params.id })
      .save({
        title: body.title,
        color: body.color,
        order: body.order,
        canvas_id: body.canvas_id
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = cards
  }

  async destroy (ctx) {
    await new Cards({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
