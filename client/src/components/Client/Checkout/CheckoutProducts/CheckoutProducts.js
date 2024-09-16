import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks';
import {CheckoutProductItem} from '../CheckoutProductItem';
import { size, map } from 'lodash';
import { Cart } from '../../../../api';
import styles from './CheckoutProducts.module.css';

const cartController = new Cart();

export function CheckoutProducts() {

  const { user } = useAuth();
  const [cartContent, setCartContent] = useState(null);
  const [definitiveTotal, setDefinitiveTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await cartController.getCart(user._id);
        setCartContent(response);

        if (response && response.total) {
          setDefinitiveTotal(response.total + 4900);
        }
             
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user._id]);

  if (!cartContent) {
    return <div>Cargando carrito...</div>;
  }

  return (
    <div className={styles.checkouProducts}>
      <h2>Resumen de tu orden</h2>
      
      <div >
            {size(cartContent) > 0 && 
              cartContent.items.map((item) => (
                <CheckoutProductItem key={item._id} item={item} />
              ))
            }
          </div>

      <h2>Resumen de la compra</h2>

      <div className={styles.checkouProductsChildren}>
        <p>Subtotal</p>
        <p>$ {cartContent.total ? cartContent.total : '0'}</p>
      </div>

      <div className={styles.checkouProductsChildren}>
        <p>Gastos de envío</p>
        <p>$4,900</p>
      </div>

      <div className={styles.checkouProductsChildren}>
        <h2>Total</h2>
        <p>${definitiveTotal ? definitiveTotal : '0'}</p>
      </div>
    </div>
  );
}
