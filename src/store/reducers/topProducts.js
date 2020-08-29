const initialState = {
    topProducts: [],
    error: false,
    loading: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_TOP_START":
            return {
                ...state,
                loading: true
            }
        case "FETCH_TOP_PRODUCTS":
            return {
                ...state,
                topProducts: action.topProducts,
                loading: false,
                error: false
            }
        case "FETCH_TOP_FAIL":
            return {
                ...state,
                error: true,
                loading: false
            }
        default: return state;
    }
};

export default reducer;