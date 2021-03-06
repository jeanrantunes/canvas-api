import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: process.env.service,
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
})

export const sendEmail = async (email, token) => {
    try {
        return await transporter.sendMail({
            from: process.env.sender,
            to: email,
            subject: 'Link para reset da senha',
            html: `<h3>Reset da senha Canvas</h3>
                    Clique no link para trocar sua senha <a href="${process.env.host}/reset-password?token=${token}">${process.env.host}/reset-password?token=${token}</a>`
        })
    } catch (err) {
        return err
    }
}

export const welcomeEmail = async (email, token) => {
    try {
        return await transporter.sendMail({
            from: process.env.sender,
            to: email,
            subject: 'Bem vindo ao canvas',
            html: `<h3>Bem vindo ao canvas</h3>
                    Clique aqui para confirmar seu cadastro <a href="${process.env.host}/signup-confirm?token=${token}">${process.env.host}/signup-confirm?token=${token}</a>`
        })
    } catch (err) {
        return err
    }
}

export const feedbackEmail = async (email, msg) => {
    try {
        return await transporter.sendMail({
            from: process.env.sender,
            to: 'jeanrantunes93@gmail.com',
            subject: `Feedback de ${email} sobre o canvas`,
            html: msg
        })
    } catch (err) {
        return err
    }
}

