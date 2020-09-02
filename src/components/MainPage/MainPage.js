import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions/index";
import classes from "./MainPage.css";
import { Link } from "react-router-dom";
import MiniRodiniImage from "../../assets/images/minirodini.png";
import AdidasImage from "../../assets/images/1200px-Adidas_Logo.svg.webp";
import LindexImage from "../../assets/images/lindex.png";
import ReimaImage from "../../assets/images/reima.png";
import JeckImage from "../../assets/images/jack-jones-vector-logo-400x400.png";
import PolarnImage from "../../assets/images/polarnOpyret.png";
import CarouselSlider from "../Carousel/Carousel";

const Main = (props) => {
  const { topProducts, loading } = useSelector((state) => ({
    topProducts: state.topProducts.topProducts,
    loading: state.topProducts.loading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchTopProducts());
    dispatch(actions.fetchCustomCategories());
  }, []);

  return (
    <div>
      <section className={classes.MainImage}>
        <div>
          <h2>Fall's most important details</h2>
          <p>Raincoats for everyday</p>
        </div>
      </section>
      <section className={classes.MainBrand}>
        <Link to="/brand/1694">
          <img src={MiniRodiniImage} alt="MiniRodini" />
        </Link>
        <Link to="/brand/830">
          <img src={AdidasImage} alt="Adidas" />
        </Link>
        <Link to="/brand/1563">
          <img src={LindexImage} alt="Lindex" />
        </Link>
        <Link to="/brand/217">
          <img src={ReimaImage} alt="Reima" />
        </Link>
        <Link to="/brand/1669">
          <img src={JeckImage} alt="Jeck" />
        </Link>
        <Link to="/brand/2780">
          <img src={PolarnImage} alt="Polarn" />
        </Link>
      </section>
      <section className={classes.News}>
        <div className={classes.NewsItem}>
          <h2>Shop for your baby!</h2>
          <div className={classes.NewsItemImgFirst}></div>
          <Link to="/category/383">Discover more</Link>
        </div>
        <div className={classes.NewsItem}>
          <h2>Choose your kids raincoat!</h2>
          <div className={classes.NewsItemImgSecond}></div>
          <Link to="/category/22">Discover more</Link>
        </div>
        <div className={classes.NewsItem}>
          <h2>Kids T-shirts</h2>
          <div className={classes.NewsItemImgThird}></div>
          <Link to="/category/44">Discover more</Link>
        </div>
      </section>
      <h3 style={{margin: "0 auto", width: "90%"}}>TOP PRODUCTS</h3>
      <CarouselSlider products={topProducts} loading={loading} />
    </div>
  );
};

export default Main;
