import React, {useState} from 'react';
import {Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { ENV } from '../../../../utils';
import { useAuth } from '../../../../hooks';
import { Product } from '../../../../api';
import {BasicModal } from '../../../Shared';
import { ProductForm } from '../ProductForm';
import './ProductItem.css';

const productController = new Product();

export function ProductItem(props) {

    const { product, onReload } = props;
    const { accessToken } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);


    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(product.active ? `Desactivar producto ${product.name}` : `Activar producto ${product.name}`);
        onOpenCloseConfirm();
    }

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Eliminar producto ${product.name}`);
        onOpenCloseConfirm();
      }
  
    const openUpdateCourse = () => {
        setTitleModal(`Actualizar ${product.name}`);
        onOpenCloseModal();
    }


    const onActivateDesactivate = async () => {
        try {
          await productController.updateProduct(accessToken, product._id, {
            active: !product.active
          });
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
      }

      const onDelete = async () => {
        try {
          await productController.deleteProduct(accessToken, product._id);
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
  }
  
  

  return (

    <>
        <div className='course-item'>
            <div className="course-item__info">
                <Image src={product.images} />
                <div>
                    <p>{product.name}</p>
                </div>
            </div>

            <div>
                <Button icon color={product.active ? "orange" : "teal"} onClick={openDesactivateActivateConfirm}>
                    <Icon name={product.active ? "ban" : "check"} />
                </Button>

                <Button icon primary onClick={openUpdateCourse} >
                    <Icon name='pencil'/>
                </Button>

                <Button icon color="red" onClick={openDeleteConfirm}>
                    <Icon name='trash'/>
                </Button>

            </div>
        </div>

        <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
            <ProductForm 
                onClose={onOpenCloseModal} 
                onReload={onReload}
                product={product}    
            />
        </BasicModal>


        <Confirm 
            open={showConfirm}
            onCancel={onOpenCloseConfirm}
            onConfirm={isDelete ? onDelete : onActivateDesactivate}
            content={confirmMessage}
            size="mini"
    
        />

    </>
  )
}
