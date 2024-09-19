  import React, { useState, useEffect } from 'react';
  import { useAuth } from '../../../../hooks';
  import { Checkout } from '../../../../api';
  import styles from './CheckoutData.module.css';

  const checkoutController = new Checkout();

  export function CheckoutData(props) {
    const { user } = useAuth();
    const {clientData, setClientData} = props

    useEffect(() => {
      (async () => {
        try {
          const response = await checkoutController.getCheckout(user._id);
          setClientData(response);
        } catch (error) {
          console.error(error);
        }
      })();
    }, []);

    // Verifica que clientData está disponible y tiene datos
    if (!clientData || !clientData.clientData || clientData.clientData.length === 0) {
      return <div>No hay datos de usuario.</div>;
    }

    // Accede al primer elemento del array clientData y clientDirection
    const userInfo = clientData.clientData[0];
    const userAddress = clientData.clientDirection[0];

    return (
      <div className={styles.checkoutData}>
        <div className={styles.checkouDataChildren}>
          <h3>Datos Personales</h3>
          <p><strong>Nombre:</strong> {userInfo.firstname}</p>
          <p><strong>Apellido:</strong> {userInfo.lastname}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Identificación:</strong> {userInfo.identification}</p>
          <p><strong>Teléfono:</strong> {userInfo.phoneNumber}</p>
        </div>
        {clientData.delivery && (
        <div className={styles.checkouDataChildren}>
          <h3>Dirección de Envío</h3>
          <p><strong>Departamento:</strong> {userAddress.department}</p>
          <p><strong>Municipio:</strong> {userAddress.municipality}</p>
          <p><strong>Calle:</strong> {userAddress.street}</p>
          <p><strong>Descripción Adicional:</strong> {userAddress.aditionalDescription}</p>
          <p><strong>Barrio:</strong> {userAddress.neighborhood}</p>
        </div>
        )}
      </div>
    );
  }
