import React from "react";

import classes from "./Carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../ProductCard/ProductCard";
import ForwardIcon from "../../assets/images/next.png";
import BackwardIcon from "../../assets/images/back.png";

const CarouselSlider = (props) => {
  const { products, loading } = {
    products: props.products,
    loading: props.loading,
  };

  
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  
  let frame = products.map((prod) => {
    const pr = prod.currentProduct;
    return (
      <ProductCard
      key={pr.id}
      id={pr.id}
      img={pr.imageUrl}
      brand={pr.brand}
      name={pr.name}
      price={pr.price}
      shop={pr.shop}
      />
      );
    });
    
    const frameDiv = frame.map((e,i) => (i % 4 === 0) ? frame.slice(i, i + 4) : null)
    .filter((e) => e)
    .map((pr, key) => {
      return <div key={key} className={classes.Slide__Wrapper}>
      {pr}
    </div>
  });


  const frameMob = frame.map((e,i) => (i % 2 === 0) ? frame.slice(i, i + 2) : null)
  .filter((e) => e)
  .map((pr, key) => {
    return <div key={key} className={classes.Slide__Wrapper}>
      {pr}
    </div>
  });


  return (
    <div className={classes.SliderBox__Wrapper}>
      <Carousel
        className="slider"
        responsive={responsive}
        partialVisible={false}
        containerClass={classes.SliderBox}
        itemClass={classes.SliderItem}
        customLeftArrow={<img src={BackwardIcon} alt="Previous" className={classes.PreviousArrow}></img>}
        customRightArrow={<img src={ForwardIcon} alt="Next" className={classes.NextArrow}></img>}
      >
        {window.innerWidth > 768 ? frameDiv : frameMob}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
