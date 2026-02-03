import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  console.log('=== API Contact llamada ===');
  
  try {
    const body = await request.json();
    console.log('Body recibido:', body);
    
    const { name, email, phone, message } = body;

    // Validación
    if (!name || !email || !phone || !message) {
      console.log('Validación falló: campos faltantes');
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validación falló: email inválido');
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validar teléfono (números, espacios, +, -, paréntesis)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      console.log('Validación falló: teléfono inválido');
      return NextResponse.json(
        { error: 'Teléfono inválido' },
        { status: 400 }
      );
    }

    // Verificar variables de entorno
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('ERROR: Variables de entorno no configuradas');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    console.log('Creando transporter...');
    
    // Configurar transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    console.log('Verificando conexión...');
    await transporter.verify();
    console.log('Conexión verificada. Enviando email...');

    // Enviar email
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} - Portfolio`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .field-label { font-weight: bold; color: #06b6d4; margin-bottom: 5px; }
              .field-value { background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #06b6d4; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 Nuevo mensaje de contacto</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">👤 Nombre:</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">📧 Email:</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">📱 Teléfono:</div>
                  <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">💬 Mensaje:</div>
                  <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>Este mensaje fue enviado desde tu portfolio web</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Nuevo mensaje de contacto

Nombre: ${name}
Email: ${email}
Teléfono: ${phone}

Mensaje:
${message}
      `,
    });

    console.log('Email enviado exitosamente:', info.messageId);

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ ERROR COMPLETO:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al enviar el mensaje. Por favor intentá de nuevo.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}