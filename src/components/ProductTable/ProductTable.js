import React from 'react';

import classes from './ProductTable.css';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../UI/Spinner/Spinner';


const ProductTable = props => {

    const {products, loading} = {products: props.products, loading: props.loading}

    let classCSS = [classes.ProductList];

    let frame = products.map(prod=> {
        let pr = prod.currentProduct
        return <ProductCard 
        key={pr.id}
        id={pr.id} 
        img={pr.imageUrl}
        brand={pr.brand} 
        name={pr.name} 
        price={pr.price} 
        shop={pr.shop}
        groupIdentity={prod.groupIdentity}/>
        }
        );

    if (loading) {
        frame = <Spinner />;
        classCSS = [classes.ProductListLoading];
    }


    return (
        <div className={classCSS.join()}>
            {frame}
        </div>
    );
}

export default ProductTable;