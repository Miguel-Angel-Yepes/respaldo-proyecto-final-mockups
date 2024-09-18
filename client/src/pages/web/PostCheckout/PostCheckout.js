import React from 'react';
import {CartData, CheckoutData} from '../../../components/Client/PostCheckout';
import styles from './PostCheckout.module.css';

export function PostCheckout() {
  return (
    <div className={styles.postCheckoutPage}>
      <CheckoutData />
      <CartData />
    </div>
  )
}
