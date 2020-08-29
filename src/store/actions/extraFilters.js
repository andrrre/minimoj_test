import axios from 'axios';

export const fetchExtraFieldsFail = (error) => {
    return {
        type: "FETCH_EXTRA_FIELDS_FAIL",
        error: error
    };
}

export const resetFetchExtraFields = () => {
    return {
        type: "RESET_QUERY"
    };
}

export const fetchExtraFieldsStart = () => {
    return {
        type: "FETCH_EXTRA_FIELDS_START"
    };
}

export const fetchExtraFieldsSuccess = (productsExtraFilters) => {
    return {
        type: "FETCH_EXTRA_FIELDS_PRODUCTS",
        productsExtraFilters: productsExtraFilters
    };
}

export const fetchExtraFields = (query) => {
    return dispatch => {
        dispatch(fetchExtraFieldsStart());
        //const queryParams = 'http://178.62.199.65/api/products/extra_fields/facet_filters/'+query[0];
        axios.get('http://178.62.199.65/api/products/extra_fields/facet_filters/'+query.queryId)
        .then( res=> {
                dispatch(fetchExtraFieldsSuccess(res.data));
            }
        )
        .catch( err => {
                dispatch(fetchExtraFieldsFail(err));
            }
        );
    };
};