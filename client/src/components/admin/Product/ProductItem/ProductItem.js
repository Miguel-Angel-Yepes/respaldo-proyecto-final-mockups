import React from 'react';
import {Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { ENV } from '../../../../utils';
import './ProductItem.css';

export function ProductItem(props) {

    const { product } = props;

  return (
    <div className='course-item'>
            <div className="course-item__info">
                <Image src={`${ENV.BASE_PATH}/${product.images}`} />
                <div>
                    <p>{product.name}</p>
                </div>
            </div>

            <div>
                <Button icon color={product.active ? "orange" : "teal"}>
                    <Icon name={product.active ? "ban" : "check"} />
                </Button>

                <Button icon primary >
                    <Icon name='pencil'/>
                </Button>

                <Button icon color="red" >
                    <Icon name='trash'/>
                </Button>

            </div>
        </div>

  )
}
