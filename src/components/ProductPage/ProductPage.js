import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import {useCookies} from 'react-cookie';

import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./ProductPage.css";
import CarouselSlider from "../Carousel/Carousel";

const ProductPage = (props) => {
  let { id } = useParams();
  const [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();

  const { product, loading, error, related } = useSelector((state) => ({
    product: state.getProductById.product,
    loading: state.getProductById.loading,
    error: state.getProductById.error,
    related: state.getProductById.related
  }));

  const cardStyle = {
    backgroundImage: `url(${product.imageUrl})`,
    backgroundSize: "contain",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    width:"100%",
    height: "100%",
    margin: "0 auto",
    padding: "0",
    boxSizing: " border-box"
}

const favoriteToggleHandler = () => {
  const favorite = cookies.favorite ? [...cookies.favorite] : [];
        if (favorite.includes(product.id)) {
            favorite.splice(favorite.indexOf(product.id),1);
        } else {
            favorite.push(product.id);
        }
        setCookie('favorite', favorite, {path: '/', sameSite: true});
}

  useEffect(() => {
    dispatch(actions.fetchProductById(id));
    dispatch(actions.fetchCustomCategories());
    dispatch(actions.fetchRelatedProducts(id));
  }, []);

  let prod = <div className={classes.Product}>
    <div style={cardStyle}></div>
    <div className={classes.InfoSection}>
      <h1>{product.name}</h1>
      <p className={classes.Shop}>{product.brand}</p>
      <h3 className={classes.Price}>{product.price+" SEK"}</h3>
      <a href={product.productUrl}>Buy it in shop</a>
      <button onClick={favoriteToggleHandler}>Add to favorite</button>
      <h3>Also available at</h3>
      <h3 style={{marginBottom: "0"}}>Details</h3>
      <p>{product.description}</p>
    </div>
  </div>;

  if (loading && !error) {
    prod = <Spinner />;
  }

  if (error) {
    prod = <h3 style={{margin: "80px auto", width: "100%"}}>Product not found</h3>;
  }

  return <div className={classes.ProductPage}>
      {prod}
      <h3 style={{marginTop: "30px", width: "100%"}}>Related products</h3>
      <CarouselSlider products={related} loading={false}></CarouselSlider>
    </div>;
};

export default withRouter(ProductPage);
