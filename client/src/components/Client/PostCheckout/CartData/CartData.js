import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks';
import { Cart } from '../../../../api';
import { PostCheckoutCartItem } from '../PostCheckoutCartItem';
import styles from './CartData.module.css';

const cartController = new Cart();

export function CartData() {
  const { user } = useAuth();
  const [cartContent, setCartContent] = useState(null); // Inicializar como null para manejar estado de carga

  useEffect(() => {
    (async () => {
      try {
        if (user && user._id) { // Verificar que user y user._id existen antes de hacer la llamada
          const response = await cartController.getCart(user._id);
          setCartContent(response);

          if (response && response.items.length > 0) {
            // Aquí llamas a la función removeCart correctamente
            for (const item of response.items) {
              await cartController.removeCart(user._id, item._id);
            }
          }
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
    <div>
      {cartContent.items.map((item) => (
        <PostCheckoutCartItem key={item._id} item={item} />
      ))}
    </div>
  );
}
