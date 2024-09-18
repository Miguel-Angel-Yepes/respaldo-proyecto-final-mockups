import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks';
import { CheckoutProductItem } from '../CheckoutProductItem';
import { size } from 'lodash';
import { Cart, Checkout } from '../../../../api';
import styles from './CheckoutProducts.module.css';

const cartController = new Cart();
const checkoutController = new Checkout();

export function CheckoutProducts(props) {
  const { deliveryState, deliveryMunicipality, setDeliveryMunicipality } = props;
  const { user } = useAuth();
  const [cartContent, setCartContent] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [definitiveTotal, setDefinitiveTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await cartController.getCart(user._id);
        const checkoutResponse = await checkoutController.getCheckout(user._id);

        setCartContent(response);
        setCheckoutData(checkoutResponse);

        // Inicializar deliveryMunicipality si no se ha establecido
        if (!deliveryMunicipality && checkoutResponse?.clientDirection[0]?.municipality) {
          setDeliveryMunicipality(checkoutResponse.clientDirection[0].municipality);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user._id]);

  useEffect(() => {
    if (cartContent && cartContent.total !== undefined) {
      const shippingCost = deliveryMunicipality === "Bello" ? 5900 : 9900;
      setDefinitiveTotal(cartContent.total + shippingCost);
    }
  }, [cartContent, deliveryMunicipality]);

  if (!cartContent) {
    return <div>Cargando carrito...</div>;
  }

  const shippingCost = deliveryState
    ? (deliveryMunicipality === "Bello" ? 5900 : 9900)
    : 0;

  return (
    <div className={styles.checkouProducts}>
      <h2>Resumen de tu orden</h2>

      <div>
        {size(cartContent.items) > 0 &&
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
        <p>$ {shippingCost ? shippingCost : '0'}</p>
      </div>

      <div className={styles.checkouProductsChildren}>
        <h2>Total</h2>
        <p>${definitiveTotal ? definitiveTotal : '0'}</p>
      </div>
    </div>
  );
}
