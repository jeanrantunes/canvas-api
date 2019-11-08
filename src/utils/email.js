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
            html:  `<h3>Reset da senha Canvas</h3>
                    Clique no link para trocar sua senha http://localhost:3000/reset-password?token=${token}`
        })
    } catch(err) {
        return err
    }
}

export const welcomeEmail = async (email) => {
    try {
        return await transporter.sendMail({
            from: process.env.sender,
            to: email,
            subject: 'Bem vindo ao canvas',
            html:  `<h3>Bem vindo ao canvas</h3>
                    Para acessar sua conta clique em http://localhost:3000/canvas`
        })
    } catch(err) {
        return err
    }
}

