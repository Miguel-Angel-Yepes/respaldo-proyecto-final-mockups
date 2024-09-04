import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared/BasicModal';
import { ListProducts } from '../../../components/admin/Product';
import './Products.css';

export function Products() {

  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Productos activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListProducts productsActive={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Productos inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListProducts productsActive={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ]

  return (
    <>
      <div className='products-page'>
        <div className='products-page__add'>
          <Button primary onClick={onOpenCloseModal}>
            Nuevo Producto
          </Button>
        </div>

        <Tab menu={{ secondary: true}} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear producto" >
        <p>Formulario para crear productos</p>
      </BasicModal>

    </>

  )
}
