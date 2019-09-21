import bookshelf from '../bookshelf'
import User from './User'

export default bookshelf.Model.extend({
  tableName: 'canvas',
  hasTimestamps: true,
  uuid: true,
  user: function () {
    return this.belongsTo(User)
  }
})
