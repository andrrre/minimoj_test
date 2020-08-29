import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useCookies} from 'react-cookie';
import {withRouter} from 'react-router-dom';

import * as actions from '../../store/actions/index';
import ProductTable from '../ProductTable/ProductTable';
import classes from './Favorite.css';

const Favorite = props => {
    const [cookies, setCookie] = useCookies();

    const dispatch = useDispatch();

    const { products, loading } = useSelector(state => ({products: state.favorite.products, loading: state.favorite.loading}));

    useEffect(() => {cookies.favorite ? dispatch(actions.fetchFavorite([...cookies.favorite])) : null}, []);
    useEffect(() => {dispatch(actions.fetchCustomCategories());}, []);

    let frame = <ProductTable products={products} loading={loading} />;

    if (!cookies.favorite) {
        frame = <p>You don't have any items yet!</p>;
    }

    return(
        <div className={classes.Favorite}>
            <h3>Your favorites</h3>
            <p className={classes.FavoriteP}>You have {cookies.favorite? cookies.favorite.length: 0} products in your list</p>
            {frame}
        </div>
    );
}

export default withRouter(Favorite);