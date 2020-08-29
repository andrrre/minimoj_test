const initialState = {
    products: [],
    error: false,
    loading: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_FAVORITE_FAIL":
            return {
                ...state,
                error: action.error
            }
        case "FETCH_FAVORITE_START":
            return {
                ...state,
                loading: true
            }
        case "FETCH_FAVORITE_PRODUCTS":
            return {
                ...state,
                products: action.products,
                loading: false
            }
        default: return state;
    }
}

export default reducer;