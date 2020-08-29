import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavigationItem from "../NavigationItem/NavigationItem";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Filter from "../../Filter/Filter";

const sideDrawer = (props) => {
  const { custom } = useSelector((state) => ({
    custom: state.categories.custom,
  }));

  const links = custom.map((cat) => {
    return (
      <Link key={cat.id} className={classes.Link} to={`/category/${cat.id}`}>
        {cat.categoryName}
      </Link>
    );
  });

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <div style={{ position: "relative" }}>
      <Backdrop
        show={props.open}
        clicked={props.closed}
        onClick={props.closed}
      />
      <div className={attachedClasses.join(" ")}>
        {links}
        <span style={{ marginTop: "35px" }}></span>
        <Link to="/" className={classes.Link}>
          Contact us
        </Link>
        <Link to="/" className={classes.Link}>
          About
        </Link>
      </div>
    </div>
  );
};

export default withRouter(sideDrawer);
