import axios from "axios";
import qs from "qs";

export const fetchFavoriteFail = (error) => {
  return {
    type: "FETCH_FAVORITE_FAIL",
    error: error,
  };
};

export const fetchFavoriteStart = () => {
  return {
    type: "FETCH_FAVORITE_START",
  };
};

export const fetchFavoriteSuccess = (products) => {
  return {
    type: "FETCH_FAVORITE_PRODUCTS",
    products: products,
  };
};

export const fetchFavorite = (products) => {
  return (dispatch) => {
    dispatch(fetchFavoriteStart());
    axios
      .get("http://178.62.199.65/api/products/by/groups_identity", {
        params: {
          groups_identity: products,
          count: 1000,
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { encodeValuesOnly: true }),
      })
      .then((res) => {
        dispatch(fetchFavoriteSuccess(res.data.collection));
      })
      .catch((err) => {
        dispatch(fetchFavoriteFail(err));
      });
  };
};
