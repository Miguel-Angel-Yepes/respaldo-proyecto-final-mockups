import React, {useState} from 'react';
import { CheckoutData, CheckoutProducts } from '../../../components/Client/Checkout';
import styles from './Checkout.module.css';

export function Checkout() {

  const [deliveryState, setDeliveryState] = useState(true);
  const [deliveryMunicipality, setDeliveryMunicipality] = useState("");

  const handleDeliveryState = (state) => {setDeliveryState(state);}

  return (
    <div className={styles.checkoutPage}>
      <CheckoutData deliveryState={deliveryState} handleDeliveryState={handleDeliveryState} setDeliveryMunicipality={setDeliveryMunicipality} deliveryMunicipality={deliveryMunicipality} />
      <CheckoutProducts deliveryState={deliveryState} setDeliveryMunicipality={setDeliveryMunicipality} deliveryMunicipality={deliveryMunicipality} />
    </div>
  )
}
