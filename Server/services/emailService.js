import nodemailer from 'nodemailer';

// Configura el transportador de correo electrónico
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'samuelondo1123@gmail.com', // Usar variables de entorno para seguridad
    pass: 'knaf wpoi tkjz rowl',
  },
});

// Función para enviar un correo electrónico
export async function sendEmail({ to, subject, html }) {
  const mailOptions = {
    from: 'samuelondo1123@gmail.com',
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
  }
}
