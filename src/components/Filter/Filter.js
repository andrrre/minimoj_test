import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import classes from "./Filter.css";
import * as actions from "../../store/actions/index";

const Filter = (props) => {
  const [
    optionsExtraFieldsColourItems,
    setOptionsExtraFieldsColourItems,
  ] = useState([]);
  const [
    optionsExtraFieldsSizeItems,
    setOptionsExtraFieldsSizeItems,
  ] = useState([]);
  const [
    optionsExtraFieldsGenderItems,
    setOptionsExtraFieldsGenderItems,
  ] = useState([]);

  const {
    categories,
    brands,
    shops,
    extraFields,
    productQuery,
    loading,
  } = useSelector((state) => ({
    categories: state.categories.categories,
    brands: state.brands.brands,
    shops: state.shops.shops,
    extraFields: state.extraFilters.extraFields,
    productQuery: state.productQuery,
    loading: state.extraFilters.loading,
  }));

  const dispatch = useDispatch();

  const options = useMemo(
    () => [
      {
        value: { sort_by: "numberOfEntries", sort_order: "DESC" },
        label: "Most popular",
      },
      {
        value: { sort_by: "price", sort_order: "DESC" },
        label: "Price descending",
      },
      {
        value: { sort_by: "price", sort_order: "ASC" },
        label: "Price ascending",
      },
      { value: { sort_by: "createdAt", sort_order: "DESC" }, label: "Newest" },
    ],
    []
  );

  /////////////////////
  const optionsCategoryItems = [];
  categories.map((ite) => {
    optionsCategoryItems.push({ value: ite.id, label: ite.categoryName });
    return null;
  });

  const optionsBrandsItems = [];
  brands.map((ite) => {
    optionsBrandsItems.push({ value: ite.id, label: ite.brandName });
    return null;
  });

  const optionsShopsItems = [];
  shops.map((ite) => {
    optionsShopsItems.push({ value: ite.id, label: ite.shopName });
    return null;
  });

  useEffect(() => {
    if (extraFields.COLOUR) {
      const optionsExtraFieldsColour = [];
      extraFields.COLOUR.map((ite) => {
        optionsExtraFieldsColour.push({ value: ite, label: ite });
        return null;
      });
      setOptionsExtraFieldsColourItems(optionsExtraFieldsColour);
    }
  }, [loading]);

  useEffect(() => {
    if (extraFields.SIZE) {
      const optionsExtraFieldsSize = [];
      extraFields.SIZE.map((ite) => {
        optionsExtraFieldsSize.push({ value: ite, label: ite });
        return null;
      });
      setOptionsExtraFieldsSizeItems(optionsExtraFieldsSize);
    }
  }, [loading]);

  useEffect(() => {
    if (extraFields.GENDER) {
      const optionsExtraFieldsGender = [];
      extraFields.GENDER.map((ite) => {
        optionsExtraFieldsGender.push({ value: ite, label: ite });
        return null;
      });
      setOptionsExtraFieldsGenderItems(optionsExtraFieldsGender);
    }
  }, [loading]);
  ///////////////////////

  const sortingChangeHandler = useCallback(({ value }) => {
    dispatch(actions.updateQuery(value));
  }, []);

  const categoryChangeHandler = (value) => {
    const arr = [];
    value.map((ite) => arr.push(ite.value));
    if (window.location.href.includes("/category/") && !arr.length) {
      const v = window.location.href.match(/[^category\/]*$/);
      arr.push(v[0]);
    }
    dispatch(actions.updateQuery({ ...productQuery, category_ids: arr }));
  };

  const brandChangeHandler = (value) => {
    const arr = [];
    value.map((ite) => arr.push(ite.value));
    dispatch(actions.updateQuery({ ...productQuery, brand_ids: arr }));
  };

  const shopChangeHandler = (value) => {
    const arr = [];
    value.map((ite) => arr.push(ite.value));
    dispatch(actions.updateQuery({ ...productQuery, shop_ids: arr }));
  };

  const extraFieldsColourChangeHandler = (value) => {
    const arr = [];
    value.map((ite) => arr.push(ite.value));
    dispatch(
      actions.updateQuery({
        ...productQuery,
        extraFields: {
          SIZE: productQuery.extraFields.SIZE || [],
          GENDER: productQuery.extraFields.GENDER || [],
          COLOUR: arr,
        },
      })
    );
  };

  const extraFieldsSizeChangeHandler = (value) => {
    const arr = [];
    value.map((ite) => arr.push(ite.value));
    dispatch(
      actions.updateQuery({
        ...productQuery,
        extraFields: {
          SIZE: arr,
          GENDER: productQuery.extraFields.GENDER || [],
          COLOUR: productQuery.extraFields.COLOUR || [],
        },
      })
    );
  };

  const extraFieldsGenderChangeHandler = (value) => {
    const arr = [];
    value.map((ite) => arr.push(ite.value));
    dispatch(
      actions.updateQuery({
        ...productQuery,
        extraFields: {
          SIZE: productQuery.extraFields.SIZE || [],
          GENDER: arr,
          COLOUR: productQuery.extraFields.COLOUR || [],
        },
      })
    );
  };

  return (
    <div className={classes.Filter}>
      <Select
        options={options}
        isSearchable={false}
        onChange={sortingChangeHandler}
        className={classes.FilterSelect}
        placeholder={"Sort By"}
      />
      <Select
        options={optionsCategoryItems}
        isSearchable={true}
        isMulti={true}
        onChange={categoryChangeHandler}
        className={classes.FilterSelect}
        placeholder={window.location.href.includes("/category/") ? "Undercategory" :"Category"}
      />

      <Select
        options={optionsBrandsItems}
        isSearchable={true}
        isMulti={true}
        onChange={brandChangeHandler}
        className={classes.FilterSelect}
        placeholder={"Brand"}
      />

      <Select
        options={optionsShopsItems}
        isSearchable={true}
        isMulti={true}
        onChange={shopChangeHandler}
        className={classes.FilterSelect}
        placeholder={"Shop"}
      />

      <Select
        options={optionsExtraFieldsColourItems}
        isSearchable={true}
        isMulti={true}
        onChange={extraFieldsColourChangeHandler}
        className={classes.FilterSelect}
        placeholder={"Colour"}
      />

      <Select
        options={optionsExtraFieldsSizeItems}
        isSearchable={true}
        isMulti={true}
        onChange={extraFieldsSizeChangeHandler}
        className={classes.FilterSelect}
        placeholder={"Size"}
      />

      <Select
        options={optionsExtraFieldsGenderItems}
        isSearchable={true}
        isMulti={true}
        onChange={extraFieldsGenderChangeHandler}
        className={classes.FilterSelect}
        placeholder={"Gender"}
      />
    </div>
  );
};

export default Filter;
