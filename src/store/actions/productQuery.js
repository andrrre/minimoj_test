export const saveSearchQuery = (query) => {
    return {
        type: "SAVE_SEARCH_QUERY",
        query: query
    };
}

export const resetQuery = () => {
    return {
        type: "RESET_QUERY"
    };
}

export const changePage = (page) => {
    return {
        type: "CHANGE_PAGE",
        page: page
    };
}

export const updateQuery = (query) => {
    return {
        type: "UPDATE_QUERY",
        ...query
    };
}