import bookshelf from '../bookshelf'
import Canvas from './Canvas'

export default bookshelf.Model.extend({
  tableName: 'cards',
  hasTimestamps: true,
  uuid: true,
  canvas: function () {
    return this.belongsTo(Canvas)
  },
  toJSON: function () {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
    delete attrs.created_at
    delete attrs.updated_at

    return attrs
  }
})
