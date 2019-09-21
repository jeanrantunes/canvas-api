/* eslint-env jest */
import app from '../src/config/server'
import request from 'supertest'
import { Database } from '../src/utils'
import UserFactory from './factory/user-factory'
import CardFactory from './factory/cards-factory'
import PostitsFactory from './factory/postits-factory'

let server
let card
let user
let postit
const knex = new Database()

describe('TEST ROLES', () => {
    beforeAll(async () => {
        await knex.create()
        server = app.listen()
        user = await UserFactory()
        card = await CardFactory()
        postit = await PostitsFactory()
    })
    // beforeEach(async () => {
    //     await knex.create()
    //     server = app.listen()
    // })

    // afterEach(async () => {
    //     await knex.destroy()
    //     server.close()
    // })

    describe('POST /v1/postits', () => {
        test('should create a new postit', async () => {
            const response = await request(server)
                .post('/v1/postits')
                .send({
                    title: 'TestCanvas',
                    color: '#444',
                    order: 1,
                    card_id: card.id,
                })
                .set('Authorization', user.token)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'color', 'order', 'card_id'])
            )
        })
    })

    describe('GET /v1/postits', () => {
        test('should return a list of postits', async () => {
            const response = await request(server)
                .get(`/v1/postits?card=${card.id}`)
                .set('Authorization', user.token)

            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body[0])).toEqual(
                expect.arrayContaining(['id', 'title', 'color', 'order', 'card_id'])
            )
        })
    })

    describe('GET /v1/postits/:id', () => {
        test('should return a postit', async () => {
            const response = await request(server)
                .get(`/v1/postits/${postit.id}`)
                .set('Authorization', user.token)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'color', 'order', 'card_id'])
            )
        })
    })

    describe('PUT /v1/postits/:id', () => {
        test('should update a postit', async () => {
            const response = await request(server)
                .put(`/v1/postits/${postit.id}`)
                .set('Authorization', user.token)
                .send({ 
                    title: 'updated ss',
                    color: '#244',
                    order: 1,
                    card_id: card.id,
                })
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'title', 'color', 'order', 'card_id'])
            )
        })
    })

    describe('DELETE /v1/postits/:id', async () => {
        test('should delete a postit', async () => {
            const response = await request(server)
                .delete(`/v1/postits/${postit.id}`)
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
