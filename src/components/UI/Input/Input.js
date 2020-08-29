import React from 'react';
import SearchIcon from '../../../assets/images/icons8-search.svg';

import classes from './Input.css';

const Search = ( props ) => {
    let searchShow = classes.Input;

    // const query = useSelector(state => state.search.query);

    if (props.show) {
        searchShow = classes.searchShow;
    }

    return (
        <div className={searchShow}>
            <form onSubmit={props.submit}>
                <img className={classes.SearchIcon} src={SearchIcon} alt="Search" />
                <input
                defaultValue=""
                className={classes.InputElement}
                placeholder='Search'
                onChange={props.changed} 
                />
            </form>
        </div>
    );

};

export default Search;