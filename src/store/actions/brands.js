import axios from 'axios';

export const fetchBrandsFail = (error) => {
    return {
        type: "FETCH_BRANDS_FAIL",
        error: error
    };
}

export const resetFetchBrands = () => {
    return {
        type: "RESET_QUERY"
    };
}

export const fetchBrandsStart = () => {
    return {
        type: "FETCH_BRANDS_START"
    };
}

export const fetchBrandsSuccess = (brands, count, page) => {
    return {
        type: "FETCH_BRANDS_PRODUCTS",
        brands: brands,
        count: count,
        page: page
    };
}

export const fetchBrands = (query) => {
    return dispatch => {
        dispatch(fetchBrandsStart());
        //const queryParams = 'http://178.62.199.65/api/brand/facet_filters/'+query[0]+'?sort_by=brandName&sort_order=ASC&page=1';
        axios.get('http://178.62.199.65/api/brand/facet_filters/'+query.queryId, 
            {
                params: {
                    sort_by: 'brandName', 
                    sort_order: 'ASC', 
                    page: 1,
                    count: 1000
                }
            })
        .then( res=> {
                dispatch(fetchBrandsSuccess(res.data.collection, res.data.count, 1));
            }
        )
        .catch( err => {
                dispatch(fetchBrandsFail(err));
            }
        );
    };
};