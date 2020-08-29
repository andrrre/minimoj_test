import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import searchReducer from './store/reducers/search';
import favoriteReducer from './store/reducers/favorite';
import productsReducer from './store/reducers/productQuery';
import productReducer from './store/reducers/getProductById';
import categoriesReducer from './store/reducers/categories';
import brandsReducer from './store/reducers/brands';
import shopsReducer from './store/reducers/shops';
import extraFiltersReducer from './store/reducers/extraFilters';
import fetchTopProducts from './store/reducers/topProducts';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    search: searchReducer,
    favorite: favoriteReducer,
    productQuery: productsReducer,
    getProductById: productReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    shops: shopsReducer,
    extraFilters: extraFiltersReducer,
    topProducts: fetchTopProducts
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
