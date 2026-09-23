import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sendContactEmail } from './mailer.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Aikata API', timestamp: new Date().toISOString() })
})

// Contact / Demo request endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { nombre, empresa, email, telefono, interes, mensaje } = req.body

    if (!nombre || !email) {
      return res.status(400).json({
        ok: false,
        message: 'El nombre y el correo electrónico son obligatorios.'
      })
    }

    console.log(`[POST /api/contact] Solicitud recibida de: ${nombre} (${empresa || 'Sin empresa'}) - ${email}`)

    await sendContactEmail({ nombre, empresa, email, telefono, interes, mensaje })

    console.log('[POST /api/contact] Correo enviado exitosamente a: hello@aikatacol.online')

    return res.status(200).json({
      ok: true,
      message: 'Solicitud recibida y enviada con éxito.'
    })
  } catch (error) {
    console.error('[POST /api/contact] Error al procesar solicitud:', error.message)
    return res.status(500).json({
      ok: false,
      message: error.message || 'Ocurrió un error al enviar tu solicitud. Intenta más tarde.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor Aikata Backend escuchando en http://localhost:${PORT}`)
  console.log('📬 Correo configurado para notificaciones: hello@aikatacol.online')
})
