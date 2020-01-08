import Canvas from '../../database/models/Canvas'
import UserFactory from './user-factory'
import {
  stringGenerator
} from '../../src/utils'

export default async () => {
  const user = await UserFactory()

  let canvas = await new Canvas({
    title: stringGenerator(),
    description: stringGenerator(),
    userId: user.id,
  }).save()

  return canvas
}
