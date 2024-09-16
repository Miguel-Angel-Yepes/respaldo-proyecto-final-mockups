import React, {useState} from 'react';
import { ENV } from '../../../../utils';
import { Image } from 'semantic-ui-react';
import styles from './CheckoutProductItem.module.css';

export function CheckoutProductItem(props) {

  const {item} = props;

  const [quantity, setQuantity] = useState(item.quantity);
  const subTotal = item.productId.price * quantity;


  return (
    <div className={styles.itemContainer}>
      <Image src={`${ENV.BASE_PATH}/${item.productId.images}`} />
      <div className={styles.itemContainerText}> 
        <h2 className={styles.itemContainerH}>{item.productId.name}</h2>
        <div className={styles.itemContainerP}>
          <p>{quantity}</p>
          <p>$  {subTotal}</p>
        </div>
      </div>
    </div>
  )
}
