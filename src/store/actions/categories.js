import axios from 'axios';

export const fetchCategoriesFail = (error) => {
    return {
        type: "FETCH_CATEGORIES_FAIL",
        error: error
    };
}

export const resetFetchCategories = () => {
    return {
        type: "RESET_QUERY"
    };
}

export const fetchCategoriesStart = () => {
    return {
        type: "FETCH_CATEGORIES_START"
    };
}

export const changeCategoryPage = (page) => {
    return {
        type: "CHANGE_CAT_PAGE",
        page: page
    }
}

export const fetchCategoriesSuccess = (categories, count, page) => {
    return {
        type: "FETCH_CATEGORIES_PRODUCTS",
        categories: categories,
        count: count,
        page: page
    };
}

export const fetchCustomCategoriesSuccess = (collection) => {
    return {
        type: "FETCH_CUSTOM_CATEGORIES",
        custom: collection
    };
};

export const fetchCustomCategories = () => {
    return dispatch => {
        axios.get('http://178.62.199.65/api/categories/custom')
        .then( res=> {
                dispatch(fetchCustomCategoriesSuccess(res.data.collection.reverse()));
            }
        )
        .catch( err => {
                return null;
            }
        );
    };
};

export const fetchCategories = (query) => {
    return dispatch => {
        dispatch(fetchCategoriesStart());
        axios.get('http://178.62.199.65/api/category/facet_filters/'+query.queryId, 
            {
                params: { 
                    sort_by: 'categoryName', 
                    sort_order: 'ASC', 
                    page: 1,
                    count: 1000
                }
            })
        .then( res=> {
                dispatch(fetchCategoriesSuccess(res.data.collection, res.data.count, 1));
            }
        )
        .catch( err => {
                dispatch(fetchCategoriesFail(err));
            }
        );
    };
};