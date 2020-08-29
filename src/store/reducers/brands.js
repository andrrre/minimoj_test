const initialState = {
    brands: [],
    count: null,
    page: 1,
    error: false,
    loading: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_BRANDS_START":
            return {
                ...state,
                loading: true
            }
        case "RESET_QUERY":
            return {
                brands: [],
                count: null,
                page: 1,
                error: false,
                loading: false
            }
        case "FETCH_BRANDS_PRODUCTS":
            return {
                ...state,
                brands: action.brands,
                count: action.count,
                loading: false,
                error: false,
                page: action.page
            }
        case "FETCH_BRANDS_FAIL":
            return {
                ...state,
                error: true,
                loading: false
            }
        default: return state;
    }
};

export default reducer;