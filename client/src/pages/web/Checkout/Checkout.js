import React from 'react';
import { CheckoutData, CheckoutProducts } from '../../../components/Client/Checkout';
import styles from './Checkout.module.css';

export function Checkout() {
  return (
    <div className={styles.checkoutPage}>
      <CheckoutData />
      <CheckoutProducts />
    </div>
  )
}
