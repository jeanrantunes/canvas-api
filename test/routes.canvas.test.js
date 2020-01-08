/* eslint-env jest */
import app from '../src/config/server'
import request from 'supertest'
import { Database } from '../src/utils'
import UserFactory from './factory/user-factory'
import CanvasFactory from './factory/canvas-factory'

let server
let user
let canvas
const knex = new Database()

describe('TEST ROLES', () => {
    beforeAll(async () => {
        await knex.create()
        server = app.listen()
        user = await UserFactory()
        canvas = await CanvasFactory()
    })
    // beforeEach(async () => {
    //     await knex.create()
    //     server = app.listen()
    // })

    // afterEach(async () => {
    //     await knex.destroy()
    //     server.close()
    // })

    describe('POST /v1/canvas', () => {
        test('should create a new canvas', async () => {
            const response = await request(server)
                .post('/v1/canvas')
                .send({
                    title: 'TestCanvas',
                    description: 'test description',
                })
                .set('Authorization', user.token)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'description', 'userId', 'created_at', 'updated_at'])
            )
        })
    })

    describe('GET /v1/canvas', () => {
        test('should return a list of canvas', async () => {
            const response = await request(server)
                .get('/v1/canvas')
                .set('Authorization', user.token)

            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body[0])).toEqual(
                expect.arrayContaining(['id', 'title', 'description', 'userId', 'created_at', 'updated_at'])
            )
        })
    })

    describe('GET /v1/canvas/:id', () => {
        test('should return a canvas', async () => {
            const response = await request(server)
                .get(`/v1/canvas/${canvas.id}`)
                .set('Authorization', user.token)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'description', 'userId', 'created_at', 'updated_at'])
            )
        })
    })

    describe('PUT /v1/canvas/:id', () => {
        test('should update a canvas', async () => {
            const response = await request(server)
                .put(`/v1/canvas/${canvas.id}`)
                .set('Authorization', user.token)
                .send({ 
                    title: 'Update tesst',
                    description: 'test description 123',
                })
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'description', 'userId', 'updated_at'])
            )
        })
    })

    describe('DELETE /v1/canvas/:id', async () => {
        test('should delete a canvas', async () => {
            const response = await request(server)
                .delete(`/v1/canvas/${canvas.id}`)
                .set('Authorization', user.token)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining([
                    'id'
                ])
            )
        })
    })
})
