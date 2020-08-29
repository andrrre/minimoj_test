import axios from 'axios';
import qs from 'qs';

export const fetchProductsFail = (error) => {
    return {
        type: "FETCH_SEARCH_FAIL",
        error: error
    };
}

export const fetchProductsStart = () => {
    return {
        type: "FETCH_SEARCH_START"
    };
}

export const fetchProductsSuccess = (products, count, queryId) => {
    return {
        type: "FETCH_SEARCH_PRODUCTS",
        products: products,
        count: count,
        queryId: queryId
    };
}

export const fetchProducts = (query) => {
    return dispatch => {
        dispatch(fetchProductsStart());
        axios.get('http://178.62.199.65/api/products',{
            params:{
                count: 20, 
                ...query
            },
            paramsSerializer: params => qs.stringify(params, { encodeValuesOnly: true })
        })
        .then( res=> {
                dispatch(fetchProductsSuccess(res.data.collection, res.data.count, res.data.uniqIdentificationQuery));
            }
        )
        .catch( err => {
                dispatch(fetchProductsFail(err));
            }
        );
    };
};