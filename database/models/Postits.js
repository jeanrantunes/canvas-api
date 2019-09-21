import bookshelf from '../bookshelf'
import Cards from './Cards'

export default bookshelf.Model.extend({
  tableName: 'postits',
  hasTimestamps: true,
  uuid: true,
  card: function () {
    return this.belongsTo(Cards)
  },
  toJSON: function () {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
    delete attrs.created_at
    delete attrs.updated_at

    return attrs
  }
})
