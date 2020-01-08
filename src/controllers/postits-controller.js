import Postits from '../../database/models/Postits'
import Cards from '../../database/models/Cards'
import Canvas from '../../database/models/Canvas'

import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '../utils'

export default class Controller {
  async index (ctx) {
    const postits = await new Postits()
      .where('cardId', ctx.query.card)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

      ctx.body = postits
  }

  async show (ctx) {
    const postits = await new Postits({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = postits
  }

  async order (ctx) {
    const { body } = ctx.request
    if (!body && !body.length) {
      ctx.body = []
      return
    }
    
    const p = body.map(async(element, index) => {
      return await new Postits({ id: element })
        .save({
          order: index
          }, { method: 'update' })
        .catch(err => { throw new NotFound(err.toString()) })
      })
      
    ctx.body = await Promise.all(p)
  }

  async create (ctx) {
    const { body } = ctx.request

    const postits = await new Postits({
      title: body.title,
      color: body.color,
      order: body.order,
      cardId: body.cardId
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    updateTimestamp(body.cardId)

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
        cardId: body.cardId
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    updateTimestamp(body.cardId)

    ctx.body = postits
  }

  async destroy (ctx) {
    await new Postits({ id: ctx.params.id })
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

  if (!card) {
    return
  }

  card
    .save({
      updated_at: now
    })
    .catch(err => { throw new InternalServerError(err.toString()) })
  
  const c = await card.fetch().catch(err => { throw new InternalServerError(err.toString()) })

  const canvasId = c.attributes.canvasId
  
  if (!canvasId) {
    return
  }
  
  await new Canvas({ id: canvasId })
    .save({
      updated_at: now
    })
    .catch(err => { throw new InternalServerError(err.toString()) })
}