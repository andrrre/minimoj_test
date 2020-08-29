import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, withRouter, Link } from "react-router-dom";

import classes from "./Toolbar.css";
import * as actions from "../../../store/actions/index";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SearchInput from "../../UI/Input/Input";
import useDocumentScrollThrottled from "../../../hooks/useDocumentScrollThrottled";

const Toolbar = (props) => {
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [submitValue, setSubmitValue] = useState();
  const [shouldSearchShow, setShouldSearchShow] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const {custom, productQuery} = useSelector((state) => ({
    custom: state.categories.custom,
    productQuery: state.productQuery
  }));

  const searchFetch = useCallback(() => {
    dispatch(actions.resetQuery());
    dispatch(actions.resetFetchCategories());
    dispatch(actions.resetFetchBrands());
    dispatch(actions.resetFetchShops());
    dispatch(actions.resetFetchExtraFields());
    dispatch(actions.saveSearchQuery(submitValue));
  }, [submitValue]);

  useEffect(() => {
    searchFetch();
  }, [submitValue]);

  // const products = useSelector(state => state.search.products);
  // console.log(products);

  const MINIMUM_SCROLL = 10;
  const TIMEOUT_DELAY = 250;

  useDocumentScrollThrottled((callbackData) => {
    const { previousScrollTop, currentScrollTop } = callbackData;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

    setTimeout(() => {
      setShouldHideHeader(isScrolledDown && isMinimumScrolled);
    }, TIMEOUT_DELAY);
  });

  let attachedClasses = [classes.Toolbar];
  // let attachedClassesNav = [classes.Navigation];
  let navigationLogo = [classes.NavigationLogo, classes.NavigationLogoHiden];

  if (shouldHideHeader && window.innerWidth > 768) {
    attachedClasses = [classes.Toolbar, classes.Hidden];
    // attachedClassesNav = [classes.Navigation, classes.NavigationUp];
    navigationLogo = [classes.NavigationLogo];
  }

  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitValue(inputValue);
    history.push("/search");
  };

  const searchClickHandler = (event) => {
    setShouldSearchShow(!shouldSearchShow);
  };

  const links = custom.map(cat => {
    return <Link
      key={cat.id}
      className={classes.Link} 
      to={`/category/${cat.id}`}>
        {cat.categoryName}
    </Link>
  })

  return (
    <div className={attachedClasses.join(" ")}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <NavLink to="/">
        <div className={classes.Logo}>
          <Logo />
        </div>
      </NavLink>
      <SearchInput
        key={"search1"}
        value={inputValue}
        changed={(event) => inputHandler(event)}
        show={shouldSearchShow}
        submit={(event) => submitHandler(event)}
      />
      {/* <nav className={classes.DesktopOnly}> */}
      <NavigationItems
        clicked={searchClickHandler}
        isAuthenticated={props.isAuth}
      />
      <nav className={classes.Navigation}>
        <div>
          {links}
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Toolbar);
