import Postits from '../../database/models/Postits'
import CardsFactory from './cards-factory'
import {
  stringGenerator
} from '../../src/utils'

export default async () => {
  const card = await CardsFactory()

  let postits = await new Postits({
    title: stringGenerator(),
    color: '#323',
    order: 1,
    cardId: card.id,
  }).save()

  return postits
}
