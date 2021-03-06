import Joi from 'joi'
import validate from 'koa-joi-validate'

export default class Validate {
  create () {
    return validate({
      body: {
        title: Joi.string().required(),
        description: Joi.string().allow(null),
      }
    })
  }

  update () {
    return validate({
      body: {
        title: Joi.string().required(),
        description: Joi.string().allow(null),
      }
    })
  }
}
