import React, { useState, useEffect } from 'react';
import { CartData, CheckoutData } from '../../../components/Client/PostCheckout';
import { PostCheckout as PostCheckoutClass } from '../../../api';
import styles from './PostCheckout.module.css';

const postCheckoutController = new PostCheckoutClass();

export function PostCheckout() {
  const [clientData, setClientData] = useState(null);
  const [cartContent, setCartContent] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(null);

  useEffect(() => {
    if (clientData && cartContent && deliveryCost !== null ) {
      (async () => {
        try {
          const dataToSend = {
            clientData,
            cartContent,
            deliveryCost
          };
          
          // Envía el correo
          await postCheckoutController.sendAdminEmail(dataToSend);
          await postCheckoutController.sendUserEmail(dataToSend);
          // Marca el correo como enviado
        } catch (error) {
          console.error('Error al enviar el correo:', error);
        }
      })();
    }
  }, [clientData, cartContent, deliveryCost]); // Incluye emailSent en las dependencias

  return (
    <div className={styles.postCheckoutPage}>
      <CheckoutData clientData={clientData} setClientData={setClientData} />
      <CartData cartContent={cartContent} setCartContent={setCartContent} deliveryCost={deliveryCost} setDeliveryCost={setDeliveryCost} />
    </div>
  );
}
