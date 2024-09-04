import React, {useEffect, useState} from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
import { size, map } from 'lodash'
import { Product } from '../../../../api';
import { ProductItem } from "../ProductItem";
import './ListProducts.css';

const productController = new Product();

export function ListProducts(props) {

    const [products, setProducts] = useState(null);
    const { productsActive, reload, onReload } = props;
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await productController.getProducts({page, limit: 1, active: productsActive});
                setProducts(response.docs);  
                setPagination({
                  limit: response.limit,
                  page: response.page,
                  pages: response.totalPages,
                  total: response.totalDocs,
                })   
            } catch (error) {
                console.error(error)
            }
        })()
    }, [productsActive, reload, page]);

    const changePage = (_, data) => {
      setPage(data.activePage);
    }

    if(!products) return <Loader active inline="centered" />;
    if(size(products) === 0) return "No hay ningún producto";

  return (
    <div>
      {map(products, (product) => (
        <ProductItem key={product._id} product={product} />
      ))}

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

    </div>
  )
}
