import Canvas from '../../database/models/Canvas'
import Cards from '../../database/models/Cards'
import Postits from '../../database/models/Postits'

import {
  BadRequest,
  NotFound,
  InternalServerError,
} from '../utils'

export default class Controller {
  async index (ctx) {
    let canvas = await new Canvas()
      .where('user_id',  ctx.state.user.sub.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = canvas
  }

  async show (ctx) {
    const canvas = await new Canvas({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })
    
    const cards = await new Cards()
      .where('canvas_id', canvas.attributes.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

      ctx.body = {
        ...canvas.attributes,
        cards: cards
      }
  }

  async create (ctx) {
    const { body } = ctx.request
    let cards = []
    const canvas = await new Canvas({
      title: body.title,
      description: body.description,
      user_id: ctx.state.user.sub.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    
    cards.push(await new Cards({
      title: 'Justification',
      color: '#ddd',
      order: 1,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )
    
    cards.push(await new Cards({
      title: 'Product',
      color: '#444',
      order: 2,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Stakeholders',
      color: '#444',
      order: 3,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Assumptions',
      color: '#444',
      order: 4,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )
    cards.push(await new Cards({
      title: 'Scratchs',
      color: '#444',
      order: 5,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Smart Goals',
      color: '#444',
      order: 6,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Requirements',
      color: '#444',
      order: 7,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Team',
      color: '#444',
      order: 8,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Delivery Goals',
      color: '#444',
      order: 9,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Costs',
      color: '#444',
      order: 10,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Benefits',
      color: '#444',
      order: 11,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    cards.push(await new Cards({
      title: 'Restrictions',
      color: '#444',
      order: 12,
      canvas_id: canvas.attributes.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })
    )

    ctx.body = {
      ...canvas.attributes,
      cards: cards
    }
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
    const cards = await new Cards()
      .where('canvas_id', ctx.params.id)
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    if (cards && cards.length > 0) {
      cards.forEach(async c => {
        await new Postits()
          .where('card_id', c.attributes.id)
          .destroy()
          .catch(err => { throw new BadRequest(err.toString()) })
      })
      await new Cards()
      .where('canvas_id', ctx.params.id)
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    }
  
    await new Canvas({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
