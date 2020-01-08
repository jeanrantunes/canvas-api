import Cards from '../../database/models/Cards'
import Postits from '../../database/models/Postits'
import Canvas from '../../database/models/Canvas'
import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '../utils'

export default class Controller {
  async index (ctx) {
    const cards = await new Cards()
      .where('canvasId', ctx.query.canvas)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

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
      order: body.order,
      canvasId: body.canvasId
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    updateTimestamp(cards.attributes.id)

    ctx.body = await new Cards({ id: cards.attributes.id })
      .fetch()
      .catch(err => { throw new InternalServerError(err.toString()) })
  }

  async update (ctx) {
    const { body } = ctx.request

    const cards = await new Cards({ id: ctx.params.id })
      .save({
        title: body.title,
        order: body.order,
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    updateTimestamp(cards.attributes.id)
      
    ctx.body = cards
  }

  async destroy (ctx) {

    const postits = await new Postits()
      .where('cardId', ctx.params.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    if (postits && postits.length > 0) {
      await new Postits()
        .where('cardId', ctx.params.id)
        .destroy()
        .catch(err => { throw new BadRequest(err.toString()) })
    }

    await new Cards({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}

const updateTimestamp = async (cardId) => {
  if (!cardId) {
    return
  }

  const now = new Date()

  const card = await new Cards({ id: cardId })
    .fetch()
    .catch(err => { throw new InternalServerError(err.toString()) })

  if (!card) {
    return
  }

  const canvasId = card.attributes.canvasId
  
  if (!canvasId) {
    return
  }
  
  await new Canvas({ id: canvasId })
    .save({
      updated_at: now
    })
    .catch(err => { throw new InternalServerError(err.toString()) })
}