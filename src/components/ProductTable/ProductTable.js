import React from 'react';

import classes from './ProductTable.css';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../UI/Spinner/Spinner';
import {useCookies} from 'react-cookie';


const ProductTable = props => {
    const [cookies, setCookie] = useCookies();

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

    if (window.location.href.includes("/favorite") && cookies.favorite && !cookies.favorite.length) {
        frame = null;
    }

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