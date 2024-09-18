import React, { useState, useEffect } from 'react';
import { Image, Icon, Input, Modal, Button } from 'semantic-ui-react';
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

  const [quantity, setQuantity] = useState(item.quantity);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const subTotal = item.productId.price * quantity;
  const stock = item.productId.stock; // Supone que el stock está disponible en item.productId.stock

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleRedirect = () => {
    navigate('/product', { state: { productId: item.productId._id } });
    if (onOpenCloseCart) {
      onOpenCloseCart();
    }
  };

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

    // Validación de stock
    if (newQuantity > stock) {
      setIsModalOpen(true); // Muestra el modal si la cantidad supera el stock
      return;
    }

    try {
      await cartController.updateCartQuantity(user._id, item.productId._id, newQuantity);
      setQuantity(newQuantity); // Actualiza el estado con la nueva cantidad
      onReloadCart(); // Recarga el carrito
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cierre del modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const discountedPrice = (discount, price) => {
    const discountAmount = price * (
      discount / 100);
      const Price = (price - discountAmount) * quantity;
      const finalPrice = `$${Price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
      return finalPrice;
    };
  
    return (
      <>
        <div className={styles.itemContainer} onClick={handleRedirect}>
          <Image src={item.productId.images} />
  
          <div className={styles.itemDetails}>
            <h2>{item.productId.name}</h2>
            <div className={styles.priceInputContainer}>
              {item.productId.discount ? (
                <p>{discountedPrice(item.productId.cantDiscount, item.productId.price)}</p>
              ) : (
                <p>{item.productId.price * quantity}</p>
              )}
  
              <Input
                type="number"
                value={quantity}
                onChange={onQuantityChange} // Llama a la función al cambiar el valor
                min="0" // Evita cantidades negativas
                onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al contenedor
              />
            </div>
          </div>
  
          <Icon
            name="trash alternate outline"
            size="large"
            onClick={onDelete}
            style={{ cursor: 'pointer' }}
          />
        </div>
  
        {/* Modal de advertencia de stock */}
        <Modal open={isModalOpen} onClose={closeModal} size="small">
          <Modal.Header>Advertencia</Modal.Header>
          <Modal.Content>
            <p>No hay más de {stock} productos disponibles.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={closeModal} primary>
              Entendido
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
  