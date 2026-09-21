import nodemailer from 'nodemailer'
import { buildContactEmail } from './emailTemplate.js'

export async function sendContactEmail(formData) {
  const { nombre, empresa, email } = formData
  const user = process.env.GMAIL_USER || 'Santiagobazzanir@gmail.com'
  const pass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '')
  const recipient = process.env.EMAIL_TO || user

  if (!pass) {
    console.warn('\n⚠️ [Aikata Backend] AVISO: No se ha configurado GMAIL_APP_PASSWORD en server/.env.')
    console.warn('👉 Para que los correos se envíen realmente a Gmail:')
    console.warn('   1. Ve a https://myaccount.google.com con ' + user)
    console.warn('   2. Seguridad -> Verificación en 2 pasos')
    console.warn('   3. Contraseñas de aplicación -> Crear "Aikata Backend"')
    console.warn('   4. Copia el código de 16 caracteres y pégalo en server/.env\n')
    throw new Error('Falta configurar GMAIL_APP_PASSWORD en server/.env para enviar el correo.')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  })

  const { html, text } = buildContactEmail(formData)

  const info = await transporter.sendMail({
    from: `"Aikata Web" <${user}>`,
    to: recipient,
    replyTo: email,
    subject: `✦ Nueva Solicitud Aikata: ${empresa || nombre}`,
    text,
    html,
  })

  return info
}