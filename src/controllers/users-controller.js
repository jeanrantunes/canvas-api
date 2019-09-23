import User from '../../database/models/User'
import bcrypt from 'bcrypt'
import {
  BadRequest,
  NotFound,
  Unauthorized,
  InternalServerError,
  hashPassword,
  generateJWT,
  uploadFile,
  deleteFile,
  getUrl,
} from '../utils'

export default class Controller {
  async login (ctx) {
    const { body } = ctx.request

    const user = await new User({ email: body.email })
      .fetch({ withRelated: ['role'] })
      .catch(() => { throw new Unauthorized() })

    if (!user) {
      throw new Unauthorized('Usuario não encontrado')
    }

    const isValid = await bcrypt.compare(body.password, user.attributes.password)

    if (!isValid) {
      throw new Unauthorized('Senha Incorreta')
    }

    user.attributes.avatar = null

    if (user.attributes.path_photo) {
      user.attributes.avatar = await getUrl(user.attributes.path_photo)
        .catch(err => { throw new InternalServerError(err.toString()) })
    }

    user.attributes = generateJWT(user.toJSON())

    delete user.attributes.path_photo
    ctx.body = user
  }

  async index (ctx) {
    let users = await new User()
      .fetchAll({ withRelated: ['role'] })
      .catch(err => { throw new InternalServerError(err.toString()) })

    if (users && users.length) {
      users.map(user => {
        user.attributes.avatar = user.attributes.path_photo
        // console.log(user)
        delete user.attributes.path_photo
      })
    } 
    ctx.body = users
  }

  async show (ctx) {
    const user = await new User({ id: ctx.params.id })
      .fetch({ withRelated: ['role'], require: true })
      .catch(err => { throw new NotFound(err.toString()) })

    const path = user.attributes.path_photo

    user.attributes.avatar = null
    
    if (path) {
      user.attributes.avatar = await getUrl(path)
        .catch(err => { throw new InternalServerError(err.toString()) })
    }

    delete user.attributes.path_photo

    ctx.body = user
  }

  async create (ctx) {
    const { body, files } = ctx.request
    let photo, urlPhoto

    body.password = await hashPassword(body.password)

    if (files && files.avatar) {
      // console.log(files)
      // console.log(avatar)
      photo = await uploadFile(files.avatar)
        .catch(err => { throw new InternalServerError(err.toString()) })
      urlPhoto = await getUrl(photo[0].metadata.name)
        .catch(err => { throw new InternalServerError(err.toString()) })
    }

    const user = await new User({
      name: body.name,
      email: body.email,
      nickname: body.nickname,
      path_photo: body.path_photo,
      password: body.password,
      role: body.role,
      path_photo: photo ? photo[0].metadata.name : null
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    const newUser = await new User({ id: user.attributes.id })
      .fetch({ withRelated: ['role'] })
      .catch(err => { throw new InternalServerError(err.toString()) })

    newUser.attributes.avatar = urlPhoto || null 
    delete newUser.attributes.path_photo

    ctx.body = newUser
  }

  async update (ctx) {
    const { body, files } = ctx.request
    let photo, urlPhoto

    if (body.password) {
      body.password = await hashPassword(body.password)
    }

    const user = await new User({ id: ctx.params.id }).fetch()

    if (files && files.avatar) {
      if (user.attributes.path_photo) {
        /*delete the current photo*/
        deleteFile(user.attributes.path_photo)
          .catch(err => { throw new InternalServerError(err.toString()) })
      }
      photo = await uploadFile(files.avatar)
        .catch(err => { throw new InternalServerError(err.toString()) })
      urlPhoto = await getUrl(photo[0].metadata.name)
        .catch(err => { throw new InternalServerError(err.toString()) })
    } 

    const updatedUser = await new User({ id: ctx.params.id })
      .save({
        name: body.name,
        email: body.email,
        nickname: body.nickname,
        password: body.password,
        role: body.role,
        path_photo: photo ? photo[0].metadata.name : user.attributes.path_photo,
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })
    
    updatedUser.attributes.avatar = urlPhoto || user.attributes.path_photo
    delete updatedUser.attributes.path_photo

    ctx.body = updatedUser
  }

  async destroy (ctx) {
    const user = await new User({ id: ctx.params.id })
    
    if (user.attributes.path_photo) {
      deleteFile(user.attributes.path_photo)
        .catch(err => { throw new InternalServerError(err.toString()) })
    }

    user
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
