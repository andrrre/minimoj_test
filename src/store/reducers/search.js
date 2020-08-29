const initialState = {
    products: [],
    count: 0,
    error: false,
    loading: false,
    queryId: 0
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_SEARCH_START":
            return {
                ...state,
                loading: true
            }
        case "FETCH_SEARCH_PRODUCTS":
            return {
                ...state,
                products: action.products,
                count: action.count,
                loading: false,
                error: false,
                queryId: action.queryId
            }
        case "FETCH_SEARCH_FAIL":
            return {
                ...state,
                error: true,
                loading: false
            }
        default: return state;
    }
};

export default reducer;