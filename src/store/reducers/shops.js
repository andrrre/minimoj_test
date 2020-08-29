const initialState = {
    shops: [],
    count: null,
    page: 1,
    error: false,
    loading: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_SHOPS_START":
            return {
                ...state,
                loading: true
            }
        case "FETCH_SHOPS_PRODUCTS":
            return {
                ...state,
                shops: action.shops,
                count: action.count,
                loading: false,
                error: false,
                page: action.page
            }
        case "RESET_QUERY":
            return {
                shops: [],
                count: null,
                page: 1,
                error: false,
                loading: false
            }
        case "FETCH_SHOPS_FAIL":
            return {
                ...state,
                error: true,
                loading: false
            }
        default: return state;
    }
};

export default reducer;