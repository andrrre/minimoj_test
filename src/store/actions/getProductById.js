import axios from 'axios';

export const fetchProductFail = (error) => {
    return {
        type: "FETCH_PRODUCT_FAIL",
        error: error
    };
}

export const fetchProductStart = () => {
    return {
        type: "FETCH_PRODUCT_START"
    };
}

export const fetchProductSuccess = (product) => {
    return {
        type: "FETCH_PRODUCT_PRODUCTS",
        product: product
    };
}

export const fetchProductById = (id) => {
    return dispatch => {
        dispatch(fetchProductStart());
        axios.get('http://178.62.199.65/api/product/'+id)
        .then( res=> {
                dispatch(fetchProductSuccess(res.data.currentProduct.collection[0].currentProduct));
            }
        )
        .catch( err => {
                dispatch(fetchProductFail(err));
            }
        );
    };
}

export const fetchRelatedProductsSuccess = (relatedProducts) => {
    return {
        type: "FETCH_RELATED_PRODUCTS",
        related: relatedProducts
    };
}

export const fetchRelatedProducts = (id) => {
    return dispatch => {
        dispatch(fetchProductStart());
        axios.get('http://178.62.199.65/api/related/products/'+id, {
            params: {
                page: 1,
                count: 20
            }
        })
        .then( res=> {
                dispatch(fetchRelatedProductsSuccess(res.data.collection));
            }
        )
        .catch( err => {} );
    };
}