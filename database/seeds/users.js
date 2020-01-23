import uuidv4 from 'uuid/v4'

export const seed = async (knex, Promise) => {
    const uid1 = uuidv4()
    await knex('users').del()
    await knex('users').insert([
        { 
            id: uid1, 
            name: 'Jean', 
            nickname: 'Beto', 
            email: 'jeanrantunes93@gmail.com', 
            password: '12345', 
            role: 'admin',
            hasBeenConfirmed: true,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ])

    const uidcanvas = uuidv4()
    await knex('canvas').del()
    await knex('canvas').insert([
        {
            id: uidcanvas,
            title: 'teste',
            userId: uid1,
            description: 'Teste',
            created_at: new Date(),
            updated_at: new Date(),
        }
    ])

    const uidcard1 = uuidv4()
    const uidcard2 = uuidv4()
    const uidcard3 = uuidv4()
    const uidcard4 = uuidv4()
    const uidcard5 = uuidv4()
    const uidcard6 = uuidv4()
    const uidcard7 = uuidv4()
    const uidcard8 = uuidv4()
    const uidcard9 = uuidv4()
    const uidcard10 = uuidv4()
    const uidcard11 = uuidv4()
    const uidcard12 = uuidv4()

    await knex('cards').del()
    await knex('cards').insert([
        {
            id: uidcard1,
            title: 'Justificativa',
            canvasId: uidcanvas,
            order: 0,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard2,
            title: 'Produto',
            canvasId: uidcanvas,
            order: 1,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard3,
            title: 'Stakeholders',
            canvasId: uidcanvas,
            order: 2,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard4,
            title: 'Premissas',
            canvasId: uidcanvas,
            order: 3,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard5,
            title: 'Riscos',
            canvasId: uidcanvas,
            order: 4,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard6,
            title: 'Objetivos Smart',
            canvasId: uidcanvas,
            order: 5,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard7,
            title: 'Requisitos',
            canvasId: uidcanvas,
            order: 6,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard8,
            title: 'Equipe',
            canvasId: uidcanvas,
            order: 7,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard9,
            title: 'Grupos de Entrega',
            canvasId: uidcanvas,
            order: 8,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard10,
            title: 'Custos',
            canvasId: uidcanvas,
            order: 9,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard11,
            title: 'Benefícios',
            canvasId: uidcanvas,
            order: 10,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard12,
            title: 'Restrições',
            canvasId: uidcanvas,
            order: 11,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ])

    const postuid1 = uuidv4()
    const postuid2 = uuidv4()
    const postuid3 = uuidv4()
    const postuid4 = uuidv4()
    await knex('postits').del()
    await knex('postits').insert([
        { 
            id: postuid1, 
            title: 'Teste 123', 
            color: '#fff',
            order: 1,
            cardId: uidcard12,
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            id: postuid2, 
            title: 'POst 1', 
            color: '#fff',
            order: 2,
            cardId: uidcard1,
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            id: postuid3, 
            title: 'POst 123', 
            color: '#000',
            order: 3,
            cardId: uidcard2,
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            id: postuid4, 
            title: '123POst 1', 
            color: '#fff',
            order: 4,
            cardId: uidcard7,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ])
}
