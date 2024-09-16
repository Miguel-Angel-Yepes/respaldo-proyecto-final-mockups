import React, { useState, useEffect } from 'react';
import { Image, Icon, Input } from 'semantic-ui-react';
import { ENV } from '../../../../utils';
import { Cart } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';   
import styles from './CartItem.module.css';

const cartController = new Cart();

export function CartItem(props) {
  const { user } = useAuth();
  const { item, onReloadCart, onOpenCloseCart } = props;
  const navigate = useNavigate();  // Hook para navegar a otras rutas

  // Función para manejar el redireccionamiento
  const handleRedirect = () => {
    navigate('/product', { state: { productId: item.productId._id } });
    if (onOpenCloseCart) {
      onOpenCloseCart();
    }
  };

  // Usa estado para manejar la cantidad del producto
  const [quantity, setQuantity] = useState(item.quantity);
  const subTotal = item.productId.price * quantity;

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  // Función para manejar la eliminación del producto del carrito
  const onDelete = async (e) => {
    e.stopPropagation(); // Evita que el clic se propague al contenedor
    try {
      await cartController.removeCart(user._id, item.productId._id);
      onReloadCart();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cambio de cantidad
  const onQuantityChange = async (e) => {
    e.stopPropagation(); // Evita que el clic se propague al contenedor
    const newQuantity = parseInt(e.target.value, 10);

    if (isNaN(newQuantity) || newQuantity < 0) return; // Evita cantidades no válidas

    try {
      await cartController.updateCartQuantity(user._id, item.productId._id, newQuantity);
      setQuantity(newQuantity); // Actualiza el estado con la nueva cantidad
      onReloadCart(); // Recarga el carrito
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.itemContainer} onClick={handleRedirect}>
      <Image src={`${ENV.BASE_PATH}/${item.productId.images}`} />

      <div className={styles.itemDetails}>
        <h2>{item.productId.name}</h2>
        <div className={styles.priceInputContainer}>
          <p>${subTotal}</p>
          <Input
            type='number'
            value={quantity}
            onChange={onQuantityChange} // Llama a la función al cambiar el valor
            min="0" // Evita cantidades negativas
            onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al contenedor
          />
        </div>
      </div>

      <Icon name='trash alternate outline' size='large' onClick={onDelete} style={{ cursor: "pointer" }} />
    </div>
  );
}
