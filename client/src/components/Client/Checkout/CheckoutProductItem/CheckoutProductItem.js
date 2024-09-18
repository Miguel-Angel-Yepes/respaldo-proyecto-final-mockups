import React, {useState} from 'react';
import { Image } from 'semantic-ui-react';
import styles from './CheckoutProductItem.module.css';

export function CheckoutProductItem(props) {

  const {item} = props;

  const [quantity, setQuantity] = useState(item.quantity);

  const discountedPrice = (discount, price) => {
    const discountAmount = price * (discount / 100);
    const Price = (price - discountAmount) * quantity;
    const finalPrice =`$${Price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
    return finalPrice;
  };

  return (
    <div className={styles.itemContainer}>
      <Image src={item.productId.images} />
      <div className={styles.itemContainerText}> 
        <h2 className={styles.itemContainerH}>{item.productId.name}</h2>
        <div className={styles.itemContainerP}>
          <p>{quantity}</p>
          {item.productId.discount ? (
              <p > {discountedPrice(item.productId.cantDiscount, item.productId.price)}  </p>
            ) : (
            <p >{item.productId.price * quantity}</p>
            )}
        </div>
      </div>
    </div>
  )
}
