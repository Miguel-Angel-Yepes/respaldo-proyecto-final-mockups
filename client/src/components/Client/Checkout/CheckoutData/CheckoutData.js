import React, {useState, useEffect} from 'react';
import {ClientForm} from '../ClientForm';
import { DirectionForm } from '../DirectionForm';
import {Checkout} from '../../../../api';
import { useAuth } from '../../../../hooks';
import styles from './CheckoutData.module.css';

const checkoutController = new Checkout();

export function CheckoutData() {
  
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(true);

  const toggleClient = () => setIsClient(!isClient);

  const [checkoutData, setCheckoutData] = useState(null);  

  useEffect(() => {
    (async () => {
      try {
        const response = await checkoutController.getCheckout(user._id);  
        setCheckoutData(response);  
      } catch (error) {
        console.log('Error fetching checkout data:', error);
      }
    })()
  }, [user]);

  const clientData = checkoutData ? checkoutData.clientData[0] : null;
  const directionData = checkoutData ? checkoutData.clientDirection[0] : null

  return (
    <div className={styles.checkoutData} > 
    {isClient ? (
        <ClientForm clientData={clientData} toggleClient={toggleClient} />
      ) : (
        <DirectionForm directionData={directionData} />
      )}
    </div>
  )
}
