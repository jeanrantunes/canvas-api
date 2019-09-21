import Joi from 'joi'
import validate from 'koa-joi-validate'

export default class Validate {
  create () {
    return validate({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        nickname: Joi.string(),
        path_photo: Joi.string(),
        password: Joi.string().min(1).max(100).required(),
        role: Joi.string().required()
      }
    })
  }

  update () {
    return validate({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        nickname: Joi.string(),
        path_photo: Joi.string(),
        password: Joi.string().min(1).max(100).required(),
        role: Joi.string().required()
      }
    })
  }
}
