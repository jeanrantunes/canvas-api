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
      table.string('signupToken')
      table.boolean('hasBeenConfirmed').notNullable().defaultTo(false)
      table.timestamps()
    })
    .createTable('canvas', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('title').notNullable()
      table.string('description')
      table.uuid('userId')
      table.foreign('userId').references('id').inTable('users')
      table.timestamps()
    })
    .createTable('cards', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('title').notNullable()
      table.integer('order').notNullable()
      table.uuid('canvasId')
      table.foreign('canvasId').references('id').inTable('canvas')
      table.timestamps()
    })
    .createTable('postits', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('title', 1000).notNullable()
      table.string('color').notNullable()
      table.integer('order').notNullable()
      table.uuid('cardId')
      table.foreign('cardId').references('id').inTable('cards')
      table.timestamps()
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
    .dropTableIfExists('cards')
    .dropTableIfExists('canvas')
    .dropTableIfExists('postits')

   