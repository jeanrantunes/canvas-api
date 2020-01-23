import path from 'path'
import { DATABASE } from '../src/config/env'

export const development = {
  client: 'pg',
  connection: DATABASE,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}

export const staging = {
  client: 'pg',
  connection: {
    host: 'ec2-3-214-53-225.compute-1.amazonaws.com',
    database: 'dc56bsh7gias6v',
    user: 'jylqqufmffzdku',
    password: 'cc65832b5f83f69e583d3bac09c83a3642d56ded35eb09bfe2f15ce8d0e3fda8',
    ssl: true,
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}

export const production = {
  client: 'pg',
  connection: {
    host: 'boilerplate.example.us-east-1.rds.amazonaws.com',
    database: 'boilerplate_db_production',
    user: 'nave',
    password: 'password'
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}

export const test = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'db_test.sqlite3')
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  },
  useNullAsDefault: true
}

const knex = {
  development,
  production,
  staging,
  test
}

export default knex
