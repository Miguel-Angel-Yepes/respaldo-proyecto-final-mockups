import React from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { ENV } from '../../../../utils';
import { useNavigate } from 'react-router-dom'; 
import styles from './ProductItem.module.css';  // Importa los estilos

export function ProductItem(props) {
  const { product } = props;
  const navigate = useNavigate();  // Hook para navegar a otras rutas

  const handleRedirect = () => {
    navigate('/product', { state: { productId: product._id } });
  };

  const discountedPrice = (discount, price) => {
    const discountAmount = price * (discount / 100);
    const finalPrice = price - discountAmount;
    return finalPrice;
  };

  return (
    <div className={styles.courseItemInfo} onClick={handleRedirect}>  {/* Aplica la clase con styles */}
      
      <div className={styles.overlay}>  {/* Aplica la clase con styles */}
        <Icon name="cart" size="huge" style={{ color: 'white' }} />
      </div>
      <p className={styles.productName}> {product.name} </p>  {/* Aplica la clase con styles */}
      <div className={styles.imageContainer}>  {/* Aplica la clase con styles */}
        <Image src={product.images} className={styles.productImage} />  {/* Aplica la clase con styles */}
      </div>

      {product.discount ? (
        <>
          <div className={styles.discountPriceContainer} > 
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productPrice}>${discountedPrice(product.cantDiscount, product.price)}</p>  
          </div>
          <p className={styles.discountP}>Producto con descuento</p>
        </>
      ) : (
        <div>
        <div className={styles.marginBottom}></div>
        <p className={styles.productPrice}>${product.price}</p>  
        <div className={styles.marginBottom}></div>
        </div>
      )}
    </div>
  );
}
