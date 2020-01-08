/* eslint-env jest */
import app from '../src/config/server'
import request from 'supertest'
import { Database } from '../src/utils'
import UserFactory from './factory/user-factory'
import CardFactory from './factory/cards-factory'
import CanvasFactory from './factory/canvas-factory'

let server
let card
let user
let canvas
const knex = new Database()

describe('TEST ROLES', () => {
    beforeAll(async () => {
        await knex.create()
        server = app.listen()
        user = await UserFactory()
        card = await CardFactory()
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

    describe('POST /v1/cards', () => {
        test('should create a new card', async () => {
            const response = await request(server)
                .post('/v1/cards')
                .send({
                    title: 'TestCanvas',
                    color: '#444',
                    order: 1,
                    canvasId: canvas.id,
                })
                .set('Authorization', user.token)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'color', 'order', 'canvasId'])
            )
        })
    })

    describe('GET /v1/cards', () => {
        test('should return a list of cards', async () => {
            const response = await request(server)
                .get(`/v1/cards?canvas=${canvas.id}`)
                .set('Authorization', user.token)

            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body[0])).toEqual(
                expect.arrayContaining(['id', 'title', 'color', 'order', 'canvasId'])
            )
        })
    })

    describe('GET /v1/cards/:id', () => {
        test('should return a card', async () => {
            const response = await request(server)
                .get(`/v1/cards/${card.id}`)
                .set('Authorization', user.token)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'color', 'order', 'canvasId'])
            )
        })
    })

    describe('PUT /v1/cards/:id', () => {
        test('should update a card', async () => {
            const response = await request(server)
                .put(`/v1/cards/${card.id}`)
                .set('Authorization', user.token)
                .send({ 
                    title: 'updated ss',
                    color: '#244',
                    order: 1,
                    canvasId: canvas.id,
                })
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'color', 'order', 'canvasId'])
            )
        })
    })

    describe('DELETE /v1/cards/:id', async () => {
        test('should delete a card', async () => {
            const response = await request(server)
                .delete(`/v1/cards/${card.id}`)
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
