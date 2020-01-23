import bookshelf from '../bookshelf'
import Role from './Role'

export default bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  uuid: true,
  role: function () {
    return this.belongsTo(Role)
  },
  toJSON: function () {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
    delete attrs.password
    delete attrs.created_at
    delete attrs.updated_at
    delete attrs.resetPasswordToken
    delete attrs.resetPasswordExpires
    delete attrs.signupToken
    return attrs
  }
})
