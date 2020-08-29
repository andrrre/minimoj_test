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
        <Link to="/">
          <img src={MiniRodiniImage} alt="MiniRodini" />
        </Link>
        <Link to="/">
          <img src={AdidasImage} alt="Adidas" />
        </Link>
        <Link to="/">
          <img src={LindexImage} alt="Lindex" />
        </Link>
        <Link to="/">
          <img src={ReimaImage} alt="Reima" />
        </Link>
        <Link to="/">
          <img src={JeckImage} alt="Jeck" />
        </Link>
        <Link to="/">
          <img src={PolarnImage} alt="Polarn" />
        </Link>
      </section>
      <section className={classes.News}>
        <div className={classes.NewsItem}>
          <div></div>
          <h2>News1</h2>
          <p>
            We're a growing family of 282 designers and makers from around the
            world
          </p>
          <Link to="/">Discover more</Link>
        </div>
        <div className={classes.NewsItem}>
          <div></div>
          <h2>News2</h2>
          <p>
            We're a growing family of 282 designers and makers from around the
            world
          </p>
          <Link to="/">Discover more</Link>
        </div>
        <div className={classes.NewsItem}>
          <div></div>
          <h2>News3</h2>
          <p>
            We're a growing family of 282 designers and makers from around the
            world
          </p>
          <Link to="/">Discover more</Link>
        </div>
      </section>
      <h3 style={{margin: "0 auto", width: "90%"}}>TOP PRODUCTS</h3>
      <CarouselSlider products={topProducts} loading={loading} />
    </div>
  );
};

export default Main;
