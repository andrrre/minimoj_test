const initialState = {
    sort_by: "numberOfEntries",
    sort_order: "DESC",
    category_ids: [],
    shop_ids: [],
    brand_ids: [],
    extraFields: {
        SIZE: [],
        GENDER: [], 
        COLOUR: []
    },
    page: 1,
    query: ''
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case "SAVE_SEARCH_QUERY":
            return {
                ...state,
                query: action.query
            }
        case "RESET_QUERY":
            return {
                sort_by: "numberOfEntries",
                sort_order: "DESC",
                category_ids: [],
                shop_ids: [],
                brand_ids: [],
                extraFields: {
                    SIZE: [],
                    GENDER: [], 
                    COLOUR: []
                },
                page: 1,
                query: ''
            }
        case "CHANGE_PAGE":
            return {
                ...state,
                page: action.page
            }
        case "UPDATE_QUERY":
            return {
                ...state,
                //sort_by: action.sort_by,
                //sort_order: action.sort_order,
                ...action,
                page: 1
            }
        default: return state;
    }
}

export default reducer;