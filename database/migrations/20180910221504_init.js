export const up = (knex, Promise) =>
  knex.schema
    .createTable('roles', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').unique().notNullable()
    })
    .createTable('users', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').notNullable()
      table.string('nickname')
      table.string('email').unique().notNullable()
      table.text('password').notNullable()
      table.string('path_photo')
      table.string('role').references('name').inTable('roles')
      table.string('resetPasswordToken')
      table.bigInteger('resetPasswordExpires')
      table.timestamps()
    })
    .createTable('canvas', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('title').notNullable()
      table.string('description')
      table.uuid('user_id')
      table.foreign('user_id').references('id').inTable('users')
      table.timestamps()
    })
    .createTable('cards', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('title').notNullable()
      table.string('color').notNullable()
      table.integer('order').notNullable()
      table.uuid('canvas_id')
      table.foreign('canvas_id').references('id').inTable('canvas')
      table.timestamps()
    })
    .createTable('postits', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('title').notNullable()
      table.string('color').notNullable()
      table.integer('order').notNullable()
      table.uuid('card_id')
      table.foreign('card_id').references('id').inTable('cards')
      table.timestamps()
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
    .dropTableIfExists('cards')
    .dropTableIfExists('canvas')
    .dropTableIfExists('postits')

   