import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import mailgen from 'mailgen'
import twilio from 'twilio'
dotenv.config()

export const getbill = (req, res) => {
    const config = {
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    }
    const transporter = nodemailer.createTransport(config)
    const Mailgenerator = new mailgen({
        theme: 'default',
        product: {
            name: 'Coder SHOP',
            link: 'http://www.coderhouse.com'
        }
    })
    const response = {
        body: {
            intro: 'Your bill has arrived!!',
            table: {
                data: [
                    {
                        item: 'Awesome biclycle',
                        description: 'An awesome biclycicle form everyone',
                        price: 'USD 1450'
                    }
                ]
            },
            outro: 'Looking forward to do more business...'
        }
    }
    const mail = Mailgenerator.generate(response)
    const message = {
        from: process.env.GMAIL_USER,
        to: ['martinalba.ff@gmail.com', 'juampicalabro97@gmail.com'],
        subject: 'Hola Mundo!!!',
        // html: '<h1>Hola Mundo!!!</h1><hr /><ul><li>Aqui un item 1</li><li>Aqui el 2do item</li></ul>'
        html: mail
    }
    transporter.sendMail(message)
        .then(() => res.status(200).json({ status: 'success', message: 'Getbill...' }))
        .catch(err => res.status(500).json({ status: 'error', message: err.message }))
}

export const sendSMS = (req, res) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages
        .create({ body: 'Hola Mundo!!!', from: process.env.TWILLIO_PHONE, to: '+51942270712' })
        .then(message => console.log(message.sid));
}