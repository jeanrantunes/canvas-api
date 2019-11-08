import Cards from '../../database/models/Cards'
import Postits from '../../database/models/Postits'
import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '../utils'

export default class Controller {
  async index (ctx) {
    // console.log(ctx.query.canvas)
    const cards = await new Cards()
      .where('canvas_id', ctx.query.canvas)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

      // let c = await new Cards()
      // .fetchAll()
      // .catch(err => { throw new InternalServerError(err.toString()) })

      // console.log(c)
    ctx.body = cards
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

    const postits = await new Postits()
      .where('card_id', ctx.params.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    if (postits && postits.length > 0) {
      await new Postits()
        .where('card_id', ctx.params.id)
        .destroy()
        .catch(err => { throw new BadRequest(err.toString()) })
    }

    await new Cards({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
