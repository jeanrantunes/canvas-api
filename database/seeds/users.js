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
            user_id: uid1,
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
            canvas_id: uidcanvas,
            color: '#ddd',
            order: 1,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard2,
            title: 'Produto',
            canvas_id: uidcanvas,
            color: '#444',
            order: 2,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard3,
            title: 'Stakeholders',
            canvas_id: uidcanvas,
            color: '#444',
            order: 3,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard4,
            title: 'Premissas',
            canvas_id: uidcanvas,
            color: '#444',
            order: 4,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard5,
            title: 'Riscos',
            canvas_id: uidcanvas,
            color: '#444',
            order: 5,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard6,
            title: 'Objetivos Smart',
            canvas_id: uidcanvas,
            color: '#000',
            order: 6,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard7,
            title: 'Requisitos',
            canvas_id: uidcanvas,
            color: '#000',
            order: 7,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard8,
            title: 'Equipe',
            canvas_id: uidcanvas,
            color: '#000',
            order: 8,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard9,
            title: 'Grupos de Entrega',
            canvas_id: uidcanvas,
            color: '#fff',
            order: 9,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard10,
            title: 'Custos',
            canvas_id: uidcanvas,
            color: '#fff',
            order: 10,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard11,
            title: 'Benefícios',
            canvas_id: uidcanvas,
            color: '#fff',
            order: 11,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uidcard12,
            title: 'Restrições',
            canvas_id: uidcanvas,
            color: '#fff',
            order: 12,
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
            card_id: uidcard12,
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            id: postuid2, 
            title: 'POst 1', 
            color: '#fff',
            order: 2,
            card_id: uidcard1,
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            id: postuid3, 
            title: 'POst 123', 
            color: '#000',
            order: 3,
            card_id: uidcard2,
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            id: postuid4, 
            title: '123POst 1', 
            color: '#fff',
            order: 4,
            card_id: uidcard7,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ])
}
