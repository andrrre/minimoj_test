import axios from 'axios';

export const fetchShopsFail = (error) => {
    return {
        type: "FETCH_SHOPS_FAIL",
        error: error
    };
}

export const resetFetchShops = () => {
    return {
        type: "RESET_QUERY"
    };
}

export const fetchShopsStart = () => {
    return {
        type: "FETCH_SHOPS_START"
    };
}

export const fetchShopsSuccess = (shops, count, page) => {
    return {
        type: "FETCH_SHOPS_PRODUCTS",
        shops: shops,
        count: count,
        page: page
    };
}

export const fetchShops = (query) => {
    return dispatch => {
        dispatch(fetchShopsStart());
        //const queryParams = 'http://178.62.199.65/api/shop/facet_filters/'+query[0]+'?count=1000&sort_by=shopName&sort_order=ASC&page='+query[1];
        axios.get('http://178.62.199.65/api/shop/facet_filters/'+query.queryId, 
            {
                params: {
                    sort_by: 'shopName', 
                    sort_order: 'ASC', 
                    page: 1,
                    count: 1000
                }
            })
        .then( res=> {
                dispatch(fetchShopsSuccess(res.data.collection, res.data.count, 1));
            }
        )
        .catch( err => {
                dispatch(fetchShopsFail(err));
            }
        );
    };
};