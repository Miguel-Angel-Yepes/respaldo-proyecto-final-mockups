import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks';
import { PostCheckout, Checkout } from '../../../../api';
import { PostCheckoutCartItem } from '../PostCheckoutCartItem';
import styles from './CartData.module.css';

const postCheckoutController = new PostCheckout();
const checkoutController = new Checkout();

export function CartData(props) {
  const { user } = useAuth();
  const {cartContent, setCartContent, deliveryCost, setDeliveryCost} = props;

  useEffect(() => {
    (async () => {
      try {
        if (user && user._id) { // Verificar que user y user._id existen antes de hacer la llamada
          
          const response = await postCheckoutController.postCheckout(user._id);
          const checkoutResponse = await checkoutController.getCheckout(user._id);

          setCartContent(response.cart); // Aquí asignas los datos del carrito recibidos
          setDeliveryCost(checkoutResponse.deliveryCost);
          console.log();
          
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Si cartContent es null, mostrar un mensaje de carga o algo similar
  if (!cartContent) {
    return <div>Cargando carrito...</div>;
  }

  // Si no hay items, mostrar un mensaje apropiado
  if (!cartContent.items || cartContent.items.length === 0) {
    return <div>No hay productos en el carrito.</div>;
  }

  return (
    <div className={styles.checkouProducts}>
      <h2>Resumen de tu orden</h2>

      <div>
        {cartContent.items.map((item) => (
          <PostCheckoutCartItem key={item._id} item={item} />
        ))}
      </div>

      <h2>Resumen de la compra</h2>

      <div className={styles.checkouProductsChildren}>
        <p>Subtotal</p>
        <p>$ {cartContent.total ? cartContent.total : '0'}</p>
      </div>

      <div className={styles.checkouProductsChildren}>
        <p>Gastos de envío</p>
        <p>$ {deliveryCost}</p>
      </div>

      <div className={styles.checkouProductsChildren}>
        <h2>Total</h2>
        <p>${cartContent.total ? cartContent.total + deliveryCost : '0'}</p>
      </div>
    </div>
    
  );
}
