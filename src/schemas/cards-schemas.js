import Joi from 'joi'
import validate from 'koa-joi-validate'

export default class Validate {
  create () {
    return validate({
      body: {
        title: Joi.string().required(),
        color: Joi.string().required(),
        order: Joi.number().integer().required(),
        canvas_id: Joi.string().guid().required()
      }
    })
  }

  update () {
    return validate({
      body: {
        title: Joi.string().required(),
        color: Joi.string().required(),
        order: Joi.number().integer().required(),
        canvas_id: Joi.string().guid().required()
      }
    })
  }
}
