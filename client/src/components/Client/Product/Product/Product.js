import React, { useState, useEffect } from 'react';
import { Image, Icon, Sidebar, Segment, Menu, Button, Card, Modal } from 'semantic-ui-react';
import { Product as ProductClass, Cart } from '../../../../api';
import { ENV } from '../../../../utils';
import { useLocation } from 'react-router-dom';
import { CartItem } from '../../Home/CartItem';
import { size } from 'lodash';
import { useAuth } from '../../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { LoginForm, RegisterForm } from '../../../admin/Auth';
import styles from './Product.module.css';
import './cart.css';
import styles2 from '../../Home/Products/Cart.module.css';

const cartController = new Cart();
const productController = new ProductClass();

export function Product() {
  const location = useLocation();
  const { productId } = location.state || {};  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const [reloadCart, setReloadCart] = useState(false);
  const [cartContent, setCartContent] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [zIndex, setZIndex] = useState(-1);
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const onOpenCloseLogin = () => setShowLogin((prevState) => !prevState);
  const toggleForm = () => setIsLogin(!isLogin);

  const onOpenCloseCart = () => {
    setShowCart((prevState) => !prevState);
  }

  const onReloadCart = () => setReloadCart((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await cartController.getCart(user._id);
        setCartContent(response);   
        console.log(cartContent);
             
      } catch (error) {
        console.error(error);
      }
    })();

    if (showCart) {
      const timer = setTimeout(() => {
        setZIndex(11111111);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setZIndex(-1);
      }, 500);
    }   
  }, [showCart, reloadCart]);

  useEffect(() => {
    (async () => {
      try {
        const response = await productController.getProduct(productId);
        setProduct(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [productId]);

  if (!product) {
    return <div>Cargando producto...</div>;
  }

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(value < 1 ? 1 : value);
  };

  const formattedPrice = `$${product.price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const handleAddToCart = async () => {
    try {
      let cart;
      let existingQuantity = 0;
  
      try {
        // Intenta obtener el carrito del usuario
        cart = await cartController.getCart(user._id);
      } catch (error) {
        // Si no existe un carrito para el usuario, el error se captura aquí
        console.log("No se encontró un carrito existente. Creando uno nuevo.");
      }
  
      // Si se encontró el carrito, verifica si el producto ya está en él
      if (cart && cart.items.length > 0) {
        const existingItem = cart.items.find(item => item.productId === productId);
        if (existingItem) {
          existingQuantity = existingItem.quantity;
        }
      }
  
      // Calcula la nueva cantidad
      const newQuantity = existingQuantity + quantity;
  
      // Actualiza la cantidad en el carrito si el producto ya existe
      if (existingQuantity > 0) {
        await cartController.updateCartQuantity(user._id, productId, newQuantity);
      } else {
        // Si no hay carrito o el producto no estaba en el carrito, agrégalo
        await cartController.addToCart(user._id, productId, quantity);
      }
  
      // Actualiza el carrito y abre el carrito
      onReloadCart();
      onOpenCloseCart();
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };
  

  return (
    <>
      <Sidebar.Pushable as={Segment} className={styles2.sidebarPushable} style={{ zIndex: zIndex }}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          direction="right"
          vertical
          visible={showCart}
          width="wide"
          style={{backgroundColor: "#cccdce"}}
        >
          <div className={styles2.modalCartHeader}>
            <div>
              <Icon name="cart" size="big" id={styles.icon}  />
              <p>Carrito de compras</p>
            </div>

            <Icon name="close" size="big" onClick={onOpenCloseCart} style={{ cursor: "pointer" }} />
          </div>

          <div className={styles2.cartItemContainer}>
            {size(cartContent) > 0 && 
              cartContent.items.map((item) => (
                <CartItem key={item._id} item={item} onReloadCart={onReloadCart} onOpenCloseCart={onOpenCloseCart} />
              ))
            }
          </div>

          <div className={styles2.modalCartFooter}>
            <div>
              <p>Total estimado</p>
              <p>${cartContent?.total}.00</p>
            </div>

            <Button className={styles2.paymentButton} as="a" href='/checkout'>
              Ir a pagar
            </Button>
          </div>
        </Sidebar>

        <Sidebar.Pusher dimmed={showCart} onClick={onOpenCloseCart}>
          <Segment basic></Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>

      <div className={styles.productContainer}>
        <Button
          icon
          labelPosition="left"
          className={`filter__button__product`}
          id={styles.carrito}
          size="big"
          onClick={user?onOpenCloseCart:onOpenCloseLogin}

        >
          <Icon name="cart" size="big" />
          <> </> <span>Carrito de compras</span>
        </Button>

        <Card className={styles.productCard}>
          <Image className={styles.productImage} src={`${ENV.BASE_PATH}/${product.images}`} />
        </Card>
        <div className={styles.productInfo}>
          <p className={styles.productTitle}>{product.name}</p>
          <p>{formattedPrice}</p>
          <p>Seleccione la cantidad:</p>

          <div className={styles.quantitySelector}>
            <button className={styles.quantityButton} onClick={handleDecrease}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
            <button className={styles.quantityButton} onClick={handleIncrease}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <Button className={styles.addToCartButton} onClick={user?handleAddToCart:onOpenCloseLogin}>
            <FontAwesomeIcon icon={faShoppingCart} /> Agregar al carrito
          </Button>
        </div>
      </div>

      <Modal closeIcon open={showLogin} onClose={onOpenCloseLogin} className={styles.modal}>
        <Modal.Content className={styles.modalContent}>
          {isLogin ? (
            <LoginForm
              openRegister={toggleForm}
              onOpenCloseLogin={onOpenCloseLogin}
            />
          ) : (
            <RegisterForm
              openLogin={toggleForm}
              onOpenCloseLogin={onOpenCloseLogin}
            />
          )}
        </Modal.Content>
      </Modal>
    </>
  );
}
