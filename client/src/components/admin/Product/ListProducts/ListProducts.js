import React, { useEffect, useState } from 'react';
import { Loader, Pagination, Button, Icon, Dropdown, Message } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { Product } from '../../../../api';
import { ProductItem } from "../ProductItem";
import { BasicModal } from '../../../Shared';
import { categoryOptions, orderOptions } from '../../../../utils';
import './ListProducts.css';

const productController = new Product();

export function ListProducts(props) {

    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null); 
    const { productsActive, reload, onReload } = props;
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState();
    const [categories, setCategories] = useState([]);
    const [orderBy, setOrderBy] = useState("");

    const [showModal, setShowModal] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

    const cleanCategories = () => setCategories([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await productController.getProducts({ page, limit: 4, active: productsActive, categories, orderBy });
                if (response.docs.length === 0) {
                    setError("No se ha encontrado ningún producto");
                } else {
                    setProducts(response.docs);
                    setPagination({
                        limit: response.limit,
                        page: response.page,
                        pages: response.totalPages,
                        total: response.totalDocs,
                    });
                    setError(null);
                }
            } catch (error) {
                console.error(error);
                setError("No se encontró ningún producto");
            }
        })();
    }, [productsActive, reload, page, categories, orderBy]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    }

    return (
        <>
            <div className='filter'>
                <Button color="teal" icon className='filter__button' onClick={onOpenCloseModal}>
                    <Icon name="filter" />
                    <> </>
                    Filtrar productos
                </Button>

                <div className="filter__order">
                    <p>Ordenar por: </p>
                    <Dropdown
                        placeholder="Ordenar por"
                        selection
                        options={orderOptions}
                        onChange={(_, data) => { setOrderBy(data.value); }}
                    />
                </div>
            </div>
            <div>
                {error && <Message >{error}</Message>}
                {!error && !products && <Loader active inline="centered" />}
                {!error && size(products) > 0 && map(products, (product) => (
                    <ProductItem key={product._id} product={product} onReload={onReload} />
                ))}
                {!error && size(products) === 0 && <p>No hay ningún producto</p>}

                {!error && pagination && (
                    <div className='list-courses__pagination'>
                        <Pagination
                            totalPages={pagination.pages}
                            defaultActivePage={pagination.page}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            onPageChange={changePage}
                        />
                    </div>
                )}
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title="Filtrar por categoria">
                <Button
                    onClick={cleanCategories}
                    className='cleanCategories'
                    size='tiny'
                >
                    Limpiar categorias
                </Button>

                <Dropdown
                    placeholder="Selecciona categorías"
                    fluid
                    multiple
                    selection
                    options={categoryOptions}
                    value={categories}
                    onChange={(_, data) => { setCategories(data.value); }}
                />
            </BasicModal>
        </>
    )
}