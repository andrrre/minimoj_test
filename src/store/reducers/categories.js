const initialState = {
  categories: [],
  count: null,
  page: 1,
  error: false,
  loading: false,
  custom: [],
  currentCutegory: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_CATEGORIES_PRODUCTS":
      return {
        ...state,
        categories: action.categories,
        count: action.count,
        loading: false,
        error: false,
        page: action.page,
      };
    case "RESET_QUERY":
      return {
        categories: [],
        count: null,
        page: 1,
        error: false,
        loading: false,
        custom: state.custom
      };
    case "CHANGE_CAT_PAGE":
      return {
        ...state,
        page: action.page,
      };
    case "FETCH_CATEGORIES_FAIL":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "FETCH_CUSTOM_CATEGORIES":
      return {
        ...state,
        custom: action.custom,
      };
    default:
      return state;
  }
};

export default reducer;
