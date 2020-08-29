const initialState = {
    extraFields: {
        SIZE: [],
        GENDER: [], 
        COLOUR: []
    },
    error: false,
    loading: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_EXTRA_FIELDS_START":
            return {
                ...state,
                loading: true
            }
        case "RESET_QUERY":
            return {
                extraFields: {
                    SIZE: [],
                    GENDER: [], 
                    COLOUR: []
                },
                error: false,
                loading: false
            }    
        case "FETCH_EXTRA_FIELDS_PRODUCTS":
            return {
                ...state,
                extraFields: action.productsExtraFilters,
                loading: false,
                error: false
            }
        case "FETCH_EXTRA_FIELDS_FAIL":
            return {
                ...state,
                error: true,
                loading: false
            }
        default: return state;
    }
};

export default reducer;