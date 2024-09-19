import Cart from '../models/cart.js';
import { sendEmail } from '../services/emailService.js';

export const postCheckout = async (req, res) => {
    const {userId} = req.params; // Asegúrate de enviar el userId en el frontend
    
    try {

        // Buscar el carrito del usuario
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Eliminar el carrito después de mostrar los datos
        
        // Enviar los datos del carrito como respuesta
        res.status(200).json({ message: 'Carrito eliminado exitosamente', cart });
        
        await Cart.deleteOne({ userId });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el carrito', error });
    }
}

export const sendAdminEmail = async (req, res) => {
  const { clientData, clientDirection, delivery, deliveryCost } = req.body;
  const cart = req.body.items || [];
  
  if (!clientData.length || !cart.length) {
      return res.status(400).json({ error: 'Faltan datos necesarios para enviar el correo' });
  }

  const user = clientData[0];

  // Email content base
  let emailContent = `
      <h1>Nuevo pedido</h1>
      <p><strong>Cliente:</strong> ${user.firstname} ${user.lastname}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Teléfono:</strong> ${user.phoneNumber}</p>
  `;

  if (delivery) {
      // Datos de dirección y envío si delivery es true
      const direction = clientDirection[0];
      emailContent += `
          <p><strong>Dirección:</strong> ${direction.street}, ${direction.neighborhood}, ${direction.municipality}, ${direction.department}</p>
          <p><strong>Descripción Adicional:</strong> ${direction.aditionalDescription}</p>
          <p><strong>Entrega:</strong> Sí</p>
          <p><strong>Costo de Entrega:</strong> ${deliveryCost ? `$${deliveryCost}` : 'N/A'}</p>
      `;
  } else {
      // Mensaje si delivery es false
      emailContent += `
          <p><strong>Entrega:</strong> No</p>
          <p>El pedido se recogerá en tienda.</p>
      `;
  }

  emailContent += `
      <h2>Artículos del Carrito</h2>
      <ul>
          ${cart.map(item => `
              <li>
                  <strong>Producto:</strong> ${item.productId.name}<br>
                  <strong>Precio:</strong> $${item.productId.price}<br>
                  <strong>Cantidad:</strong> ${item.quantity}
              </li>
          `).join('')}
      </ul>
      <p><strong>Total:</strong> $${cart.reduce((total, item) => total + item.productId.price * item.quantity, 0) + (delivery ? deliveryCost : 0)}</p>
  `;

  try {
      await sendEmail({
          to: 'samuelondo1123@gmail.com',
          subject: 'Nuevo pedido',
          html: emailContent
      });
      res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
  }
}

export const sendUserEmail = async (req, res) => {
  const { clientData, clientDirection, delivery, deliveryCost } = req.body;
  const cart = req.body.items || [];
  
  if (!clientData.length || !cart.length) {
      return res.status(400).json({ error: 'Faltan datos necesarios para enviar el correo' });
  }

  const user = clientData[0];

  // Email content base
  let emailContent = `
      <h1>Resumen de su pedido</h1>
      <p><strong>Cliente:</strong> ${user.firstname} ${user.lastname}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Teléfono:</strong> ${user.phoneNumber}</p>
  `;

  if (delivery) {
      // Datos de dirección y envío si delivery es true
      const direction = clientDirection[0];
      emailContent += `
          <p><strong>Dirección:</strong> ${direction.street}, ${direction.neighborhood}, ${direction.municipality}, ${direction.department}</p>
          <p><strong>Descripción Adicional:</strong> ${direction.aditionalDescription}</p>
          <p><strong>Entrega:</strong> Sí</p>
          <p><strong>Costo de Entrega:</strong> ${deliveryCost ? `$${deliveryCost}` : 'N/A'}</p>
      `;
  } else {
      // Mensaje si delivery es false
      emailContent += `
          <p>Por favor, comuníquese con nosotros a través de WhatsApp para notificar la hora de recogida en la tienda. tel: +57 3012534030</p>
      `;
  }

  emailContent += `
      <h2>Artículos del Carrito</h2>
      <ul>
          ${cart.map(item => `
              <li>
                  <strong>Producto:</strong> ${item.productId.name}<br>
                  <strong>Precio:</strong> $${item.productId.price}<br>
                  <strong>Cantidad:</strong> ${item.quantity}
              </li>
          `).join('')}
      </ul>
      <p><strong>Total:</strong> $${cart.reduce((total, item) => total + item.productId.price * item.quantity, 0) + (delivery ? deliveryCost : 0)}</p>
  `;

  try {
      await sendEmail({
          to: user.email,
          subject: 'Resumen de su pedido',
          html: emailContent
      });
      res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
  }
}

