import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "react-paginate";
import { withRouter } from "react-router-dom";
import axios from 'axios';

import * as actions from "../../store/actions/index";
import classes from "./Search.css";
import ForwardIcon from "../../assets/images/next.png";
import BackwardIcon from "../../assets/images/back.png";
import ProductTable from "../ProductTable/ProductTable";
import Filter from "../Filter/Filter";
import Backdrop from "../UI/Backdrop/Backdrop";

const Search = (props) => {
  const [isMount, setIsMount] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [currentCategoryName, setCurrentCategoryName] = useState();
  const [currentPageHead, setCurrentPageHead] = useState();

  const dispatch = useDispatch();

  const {
    query,
    sort_by,
    sort_order,
    page,
    countPage,
    products,
    loading,
    queryId,
    category_ids,
    brand_ids,
    shop_ids,
    extraFields,
    productQueryAll,
  } = useSelector((state) => ({
    query: state.productQuery.query,
    sort_by: state.productQuery.sort_by,
    sort_order: state.productQuery.sort_order,
    page: state.productQuery.page,
    countPage: state.search.count,
    products: state.search.products,
    loading: state.search.loading,
    queryId: state.search.queryId,
    category_ids: state.productQuery.category_ids,
    brand_ids: state.productQuery.brand_ids,
    shop_ids: state.productQuery.shop_ids,
    extraFields: state.productQuery.extraFields,
    productQueryAll: state.productQuery,
  }));

  const pageChangeHandler = useCallback(({ selected }) => {
    dispatch(actions.changePage(selected + 1));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setIsMount(true);
    dispatch(actions.fetchCustomCategories());
  }, []);

  useEffect(() => {
    if (window.location.href.includes("/category/")) {
      const v = window.location.href.match(/[^category/]*$/);
      const arr = [];
      arr.push(v[0]);
      dispatch(actions.updateQuery({...productQueryAll, category_ids: arr, query: ''}));
    }

    if (window.location.href.includes("/brand/")) {
      const v = window.location.href.match(/[^brand/]*$/);
      const arr = [];
      arr.push(v[0]);
      dispatch(actions.updateQuery({...productQueryAll, brand_ids: arr, query: ''}));
    }
  },[window.location.href]);

  useEffect(() => {
    if (window.location.href.includes("/category/") && !loading) {
      const v = window.location.href.match(/[^category/]*$/);
      axios.get('http://178.62.199.65/api/category/'+v[0])
      .then( res=> {setCurrentCategoryName(res.data.categoryName)})
      .catch( err => {});
    }

    if (window.location.href.includes("/brand/") && !loading) {
      const v = window.location.href.match(/[^brand/]*$/);
      axios.get('http://178.62.199.65/api/brand/'+v[0])
      .then( res=> {setCurrentCategoryName(res.data.brandName)})
      .catch( err => {});
    }

    if (window.location.href.match(/[search/]*$/)[0] && countPage && !loading) {
      setCurrentPageHead(`We found ${countPage} results for "${query}"`);
    } else if ((window.location.href.match(/[^category/]*$/)[0] || 
      window.location.href.match(/[^brand/]*$/)[0]) && 
      currentCategoryName && !loading) {
      setCurrentPageHead(`${currentCategoryName}`);
    } else {
      setCurrentPageHead(null);
    }

  },[window.location.href, loading]);

  useEffect(() => {
    if (isMount) {
      let productQueryData = {
        //search: query,
        sort_by: sort_by,
        sort_order: sort_order,
        page: page,
      };
      if (query) {
        productQueryData = {
          ...productQueryData,
          search: query
        };
      }
      if (category_ids.length) {
        productQueryData = {
          ...productQueryData,
          category_ids: category_ids,
          page: 1
        };
      }
      if (brand_ids.length) {
        productQueryData = {
          ...productQueryData,
          brand_ids: brand_ids,
          page: 1
        };
      }
      if (shop_ids.length) {
        productQueryData = {
          ...productQueryData,
          shop_ids: shop_ids,
          page: 1
        };
      }
      if (extraFields.COLOUR.length) {
        productQueryData = {
          ...productQueryData,
          extra_array: {
            COLOUR: extraFields.COLOUR
          },
          page: 1
        };
      }
      if (extraFields.SIZE.length) {
        productQueryData = {
          ...productQueryData,
          extra_array: {
            ...productQueryData.extraFields,
            SIZE: extraFields.SIZE,
          },
          page: 1
        };
      }
      if (extraFields.GENDER.length) {
        productQueryData = {
          ...productQueryData,
          extra_array: {
            ...productQueryData.extraFields,
            GENDER: extraFields.GENDER,
          },
          page: 1
        };
      }

      dispatch(
        actions.fetchProducts({
          ...productQueryData
        })
      );
    }
  }, [
    query,
    sort_by,
    sort_order,
    page,
    category_ids,
    brand_ids,
    shop_ids,
    extraFields
  ]);

  useEffect(() => {
    // clear all filters when leaving page
    return () => {
      dispatch(actions.resetQuery());
      dispatch(actions.resetFetchCategories());
      dispatch(actions.resetFetchBrands());
      dispatch(actions.resetFetchShops());
      dispatch(actions.resetFetchExtraFields());
    };
  }, []);

  useEffect(() => {
    if (isMount) {
      dispatch(actions.fetchCategories({ queryId }));
      dispatch(actions.fetchBrands({ queryId }));
      dispatch(actions.fetchShops({ queryId }));
      dispatch(actions.fetchExtraFields({ queryId }));
    }
  }, [queryId]);

  const changeSideDrawer = () => {
    setShowFilter(!showFilter);
  };

  let attachedClasses = [classes.SideDrawer, classes.Close];
    if (showFilter) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

  return (
    <div>
      <h3 className={classes.Result}>
        {currentPageHead}
      </h3>
      <Backdrop show={showFilter} clicked={changeSideDrawer} />
      <div className={attachedClasses.join(' ')}>
        <Filter />
      </div>
      <div className={classes.Hide}>
        <Filter />
      </div>
      <div className={classes.FilterButton__Wrapper}>
        <button className={classes.FilterButton} onClick={changeSideDrawer}>Filter</button>
      </div>
      <ProductTable products={products} loading={loading} />
      {countPage / 20 > 1 && (
        <Paginate
          pageCount={Math.ceil(countPage / 20)}
          pageRangeDisplayed={6}
          marginPagesDisplayed={2}
          previousLabel={<img src={BackwardIcon} alt="Previous"></img>}
          nextLabel={<img src={ForwardIcon} alt="Next"></img>}
          containerClassName={classes.Paginate}
          activeClassName={classes.ActivePage}
          nextClassName={classes.Next}
          previousClassName={classes.Back}
          forcePage={page-1}
          onPageChange={pageChangeHandler}
        />
      )}
    </div>
  );
};

export default withRouter(Search);
