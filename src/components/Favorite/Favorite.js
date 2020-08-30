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
    let pr = products;

    useEffect(() => { if (cookies.favorite) { 
        cookies.favorite.length ? dispatch(actions.fetchFavorite([...cookies.favorite])) : null;
        cookies.favorite.length ? null : pr = [];
        }
    }, [cookies.favorite]);
    useEffect(() => {dispatch(actions.fetchCustomCategories())}, []);

    let frame = <ProductTable products={pr} loading={loading} />;

    return(
        <div className={classes.Favorite}>
            <h3>Your favorites</h3>
            <p className={classes.FavoriteP}>You have {cookies.favorite? cookies.favorite.length: 0} products in your list</p>
            {frame}
        </div>
    );
}

export default withRouter(Favorite);