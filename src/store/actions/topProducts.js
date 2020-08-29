import axios from 'axios';

export const fetchTopProductsFail = (error) => {
    return {
        type: "FETCH_TOP_FAIL",
        error: error
    };
}

export const fetchTopProductsStart = () => {
    return {
        type: "FETCH_TOP_START"
    };
}

export const fetchTopProductsSuccess = (topProducts) => {
    return {
        type: "FETCH_TOP_PRODUCTS",
        topProducts: topProducts
    };
}

export const fetchTopProducts = () => {
    return dispatch => {
        dispatch(fetchTopProductsStart());
        const queryParams = 'http://178.62.199.65/api/top/products?count=20';
        axios.get(queryParams)
        .then( res=> {
                dispatch(fetchTopProductsSuccess(res.data.collection));
            }
        )
        .catch( err => {
                dispatch(fetchTopProductsFail(err));
            }
        );
    };
};