import Postits from '../../database/models/Postits'
import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '../utils'

export default class Controller {
  async index (ctx) {
    const postits = await new Postits()
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

      ctx.body = postits.models.filter(c => c.attributes.card_id === ctx.query.card)
  }

  async show (ctx) {
    const postits = await new Postits({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = postits
  }

  async create (ctx) {
    const { body } = ctx.request

    const postits = await new Postits({
      title: body.title,
      color: body.color,
      order: body.order,
      card_id: body.card_id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = await new Postits({ id: postits.attributes.id })
      .fetch()
      .catch(err => { throw new InternalServerError(err.toString()) })
  }

  async update (ctx) {
    const { body } = ctx.request

    const postits = await new Postits({ id: ctx.params.id })
      .save({
        title: body.title,
        color: body.color,
        order: body.order,
        card_id: body.card_id
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = postits
  }

  async destroy (ctx) {
    await new Postits({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
