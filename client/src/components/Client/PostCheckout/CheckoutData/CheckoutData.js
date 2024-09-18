import React, {useState, useEffect} from 'react';
import { useAuth } from '../../../../hooks';
import { Checkout } from '../../../../api';
import styles from './CheckoutData.module.css';

const checkoutController = new Checkout();

export function CheckoutData() {
  return (
    <div>
      datos del usuario
    </div>
  )
}
