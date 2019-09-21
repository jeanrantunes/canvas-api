import Cards from '../../database/models/Cards'
import CanvasFactory from './canvas-factory'
import {
  stringGenerator
} from '../../src/utils'

export default async () => {
  const canvas = await CanvasFactory()

  let cards = await new Cards({
    title: stringGenerator(),
    color: '#323',
    order: 1,
    canvas_id: canvas.id,
  }).save()

  return cards
}
