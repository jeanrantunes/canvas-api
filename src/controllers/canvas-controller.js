import Canvas from '../../database/models/Canvas'
import Cards from '../../database/models/Cards'
import Postits from '../../database/models/Postits'

import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '../utils'

export default class Controller {
  async index(ctx) {
    let canvas = await new Canvas()
      .where('userId', ctx.state.user.sub.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = canvas
  }

  async show(ctx) {
    const canvas = await new Canvas({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    const cards = await new Cards()
      .where('canvasId', canvas.attributes.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    let p
    if (cards && cards.length > 0) {
      p = cards.map(async c => {
        try {
          const postits = await new Postits()
            .where('cardId', c.attributes.id)
            .orderBy('order', 'asc')
            .fetchAll()
            .catch(err => { throw new InternalServerError(err.toString()) })

          c.attributes.postits = postits
          return c
        } catch (err) {
          return c
        }
      })
    }

    const c = await Promise.all(p)

    ctx.body = {
      ...canvas.attributes,
      cards: c,
    }
  }

  async create(ctx) {
    const { body } = ctx.request
    let cards = []
    const canvas = await new Canvas({
      title: body.title,
      description: body.description,
      userId: ctx.state.user.sub.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    cards.push(await new Cards({
      title: 'Justification',
      order: 0,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Product',
      order: 1,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Stakeholders',
      order: 2,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Assumptions',
      order: 3,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )
    cards.push(await new Cards({
      title: 'Scratchs',
      order: 4,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Smart Goals',
      order: 5,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Requirements',
      order: 6,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Team',
      order: 7,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Delivery Goals',
      order: 8,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Costs',
      order: 9,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Benefits',
      order: 10,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Restrictions',
      order: 11,
      canvasId: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    ctx.body = {
      ...canvas.attributes,
      cards: cards
    }
  }

  async update(ctx) {
    const { body } = ctx.request

    const canvas = await new Canvas({ id: ctx.params.id })
      .save({
        title: body.title,
        description: body.description,
        userId: ctx.state.user.sub.id
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = canvas
  }

  async destroy(ctx) {
    const cards = await new Cards()
      .where('canvasId', ctx.params.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    if (cards && cards.length > 0) {
      cards.forEach(async c => {
        await new Postits()
          .where('cardId', c.attributes.id)
          .destroy()
          .catch(err => { throw new BadRequest(err.toString()) })
      })
      await new Cards()
        .where('canvasId', ctx.params.id)
        .destroy()
        .catch(err => { throw new BadRequest(err.toString()) })

    }

    await new Canvas({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
