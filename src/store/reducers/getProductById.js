const initialState = {
    product: {},
    error: false,
    loading: false,
    related: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_PRODUCT_START":
            return {
                ...state,
                loading: true
            }
        case "FETCH_PRODUCT_PRODUCTS":
            return {
                ...state,
                product: action.product,
                loading: false,
                error: false
            }
        case "FETCH_PRODUCT_FAIL":
            return {
                ...state,
                error: true,
                loading: false
            }
        case "FETCH_RELATED_PRODUCTS":
            return {
                ...state,
                related: action.related
            }
        default: return state;
    }
};

export default reducer;