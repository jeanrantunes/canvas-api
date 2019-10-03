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

