/**
 * Genera el correo HTML y texto plano con diseño corporativo elegante para Aikata.
 */
export function buildContactEmail({ nombre, empresa, email, telefono, interes, mensaje }) {
  const cleanPhone = (telefono || '').replace(/\D/g, '')
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('57') ? cleanPhone : '57' + cleanPhone}` : null
  const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'full', timeStyle: 'short' })

  const interesLabels = {
    'web-movil': 'Desarrollo Web / Móvil',
    'ecommerce': 'E-commerce',
    'ia': 'IA Aplicada',
    'consultoria': 'Consultoría Empresarial',
    'no-seguro': 'Aún por definir'
  }
  const labelInteres = interesLabels[interes] || interes || 'No especificado'

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud — Aikata</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f7f5; font-family:'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7f5; padding:32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 12px 36px rgba(10,68,51,0.08); border:1px solid #e6ebe8;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(145deg, #0a4433 0%, #062b20 100%); padding:40px 36px; color:#ffffff; text-align:left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:24px; font-weight:800; letter-spacing:-0.02em; font-family:'Helvetica Neue', Arial, sans-serif;">
                      Ai<span style="color:#3fcf8e;">kata</span> <span style="font-size:14px; color:#3fcf8e; font-weight:700;">相方</span>
                    </div>
                    <div style="margin-top:16px; display:inline-block; background:rgba(63,207,142,0.18); border:1px solid rgba(63,207,142,0.35); color:#a7f3d0; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:5px 12px; border-radius:100px;">
                      ✦ Nueva Solicitud de Consultoría
                    </div>
                    <h1 style="margin:14px 0 0; font-size:22px; font-weight:700; color:#ffffff; line-height:1.3;">
                      Nuevo cliente potencial interesado
                    </h1>
                    <p style="margin:6px 0 0; font-size:13px; color:#9cb3aa;">
                      Recibido el ${now}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:36px;">
              <h2 style="margin:0 0 18px; font-size:14px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:#0e6b4f;">
                Información del Contacto
              </h2>

              <!-- Lead Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; background:#fafcfb; border-radius:12px; overflow:hidden; border:1px solid #e6ebe8;">
                <tr>
                  <td style="padding:14px 18px; width:34%; font-size:13px; font-weight:600; color:#5c6663; border-bottom:1px solid #e6ebe8;">Nombre</td>
                  <td style="padding:14px 18px; font-size:14px; font-weight:700; color:#15181a; border-bottom:1px solid #e6ebe8;">${nombre}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px; font-size:13px; font-weight:600; color:#5c6663; border-bottom:1px solid #e6ebe8;">Empresa / Negocio</td>
                  <td style="padding:14px 18px; font-size:14px; font-weight:700; color:#15181a; border-bottom:1px solid #e6ebe8;">${empresa}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px; font-size:13px; font-weight:600; color:#5c6663; border-bottom:1px solid #e6ebe8;">Correo Electrónico</td>
                  <td style="padding:14px 18px; font-size:14px; color:#0e6b4f; font-weight:600; border-bottom:1px solid #e6ebe8;">
                    <a href="mailto:${email}" style="color:#0e6b4f; text-decoration:underline;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px; font-size:13px; font-weight:600; color:#5c6663; border-bottom:1px solid #e6ebe8;">Teléfono / WhatsApp</td>
                  <td style="padding:14px 18px; font-size:14px; color:#15181a; font-weight:600; border-bottom:1px solid #e6ebe8;">
                    <a href="tel:${telefono}" style="color:#15181a; text-decoration:none;">${telefono}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px; font-size:13px; font-weight:600; color:#5c6663;">Interés Principal</td>
                  <td style="padding:14px 18px; font-size:14px; font-weight:700; color:#0a4433;">
                    <span style="background:#e8f5ef; color:#0a4433; padding:4px 10px; border-radius:6px; font-size:13px;">${labelInteres}</span>
                  </td>
                </tr>
              </table>

              <!-- Mensaje / Situación -->
              <div style="margin-top:28px;">
                <h3 style="margin:0 0 10px; font-size:13px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:#5c6663;">
                  Situación / Mensaje del Negocio
                </h3>
                <div style="background:#ffffff; border:1.5px solid #e6ebe8; border-left:4px solid #0e6b4f; border-radius:8px; padding:18px; font-size:14px; color:#2c3330; line-height:1.6; font-style:${mensaje ? 'normal' : 'italic'};">
                  ${mensaje ? mensaje.replace(/\n/g, '<br>') : 'El cliente no incluyó mensaje adicional.'}
                </div>
              </div>

              <!-- Quick Action Buttons -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                      <tr>
                        <td style="padding:0 6px;">
                          <a href="mailto:${email}?subject=Respuesta%20Aikata%20-%20Consultor%C3%ADa%20para%20${encodeURIComponent(empresa)}"
                             style="display:inline-block; background:#0e6b4f; color:#ffffff; font-weight:700; font-size:14px; padding:14px 26px; text-decoration:none; border-radius:100px; box-shadow:0 8px 18px rgba(14,107,79,0.35);">
                            ✉ Responder por Correo
                          </a>
                        </td>
                        ${waUrl ? `
                        <td style="padding:0 6px;">
                          <a href="${waUrl}" target="_blank"
                             style="display:inline-block; background:#25D366; color:#ffffff; font-weight:700; font-size:14px; padding:14px 22px; text-decoration:none; border-radius:100px; box-shadow:0 8px 18px rgba(37,211,102,0.35);">
                            💬 Escribir al WhatsApp
                          </a>
                        </td>
                        ` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fafcfb; border-top:1px solid #e6ebe8; padding:24px 36px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#8b9490; line-height:1.5;">
                Notificación automática enviada a <strong style="color:#5c6663;">Aikata</strong>.<br>
                Bogotá, Colombia · <a href="https://aikata.co" style="color:#0e6b4f; text-decoration:none;">aikata.co</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const text = `
AIKATA - NUEVA SOLICITUD DE CONSULTORÍA
=======================================

Fecha: ${now}

INFORMACIÓN DEL CLIENTE:
- Nombre: ${nombre}
- Empresa: ${empresa}
- Email: ${email}
- Teléfono: ${telefono}
- Interés: ${labelInteres}

MENSAJE / SITUACIÓN:
${mensaje || '(Sin mensaje adicional)'}

-----------------------------------------
Responder a: ${email}
Aikata · Bogotá, Colombia
`

  return { html, text }
}