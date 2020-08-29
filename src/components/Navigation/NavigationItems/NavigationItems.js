import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import HeartIcon from '../../../assets/images/heart.svg';
import SearchIcon from '../../../assets/images/icons8-search.svg';

const navigationItems = (props) => {
    let empty = "M17.2549 0.241211C15.1963 0.241211 13.271 1.18009 12.0003 2.75077C10.7297 1.18009 8.80441 0.241211 6.7458 0.241211C1.69637 0.241211 -2.6124 6.00803 1.89412 12.1671C2.87025 13.5011 4.22264 14.8349 5.91376 16.1314C8.76097 18.3143 11.5649 19.6326 11.6829 19.6877C11.8838 19.7814 12.1161 19.7817 12.3178 19.6877C12.4358 19.6326 15.2397 18.3143 18.0869 16.1314C19.778 14.8349 21.1305 13.5012 22.1066 12.1671C26.6073 6.01591 22.3144 0.241211 17.2549 0.241211ZM12.0003 18.171C10.2114 17.2697 1.49126 12.5874 1.49126 6.99701C1.49126 4.09964 3.84844 1.74246 6.7458 1.74246C8.65471 1.74246 10.4166 2.78089 11.344 4.4525C11.6293 4.96683 12.3711 4.96739 12.6567 4.4525C13.5841 2.78089 15.3459 1.74246 17.2549 1.74246C20.1523 1.74246 22.5094 4.09964 22.5094 6.99701C22.5094 12.5875 13.7892 17.2698 12.0003 18.171Z"
    const fill = "M17.2548 0.241211C15.196 0.241211 13.2705 1.18003 12 2.75082C10.7295 1.18003 8.80401 0.241211 6.74527 0.241211C1.67054 0.241211 -2.60105 6.02407 1.89354 12.1676C2.86943 13.5015 4.22205 14.8353 5.91343 16.1321C8.76038 18.3152 11.5646 19.6336 11.6824 19.6885C11.8841 19.7823 12.1159 19.7823 12.3177 19.6885C12.4354 19.6336 15.2397 18.3152 18.0866 16.1321C19.778 14.8353 21.1306 13.5015 22.1065 12.1676C26.6079 6.01473 22.3131 0.241211 17.2548 0.241211Z";
    
    const [color, setColor] = useState("black");
    const [d, setD] = useState(empty);
    const [cookies, setCookie] = useCookies();
    const [count, setCount] = useState("");

    const countStyle = {
        position: "absolute",
        color: "white",
        top: "12%",
        left: "30%"
    }

    useEffect(() => {
        const k = cookies.favorite ? [...cookies.favorite] : [];
        if (k.length>0) {
            setColor("#48A094");
            setD(fill);
            setCount(`${k.length}`);
        } else {
            setCount("");
            setColor("black");
            setD(empty);
        }
    },[cookies.favorite]);

    return(
        <div className={classes.Navigation}>
            <div className={classes.NavigationItems}>
                <NavLink to="/favorite" exact={props.exact}>
                        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns={HeartIcon}>
                            <path d={d} fill={color} ></path>
                        </svg>
                        <span style={countStyle}>{count}</span>
                </NavLink>
                <NavLink to="/auth" exact={props.exact}>About</NavLink>
            </div>
            <div className={classes.MobNavigationItems}>
                <div style={{paddingBottom:"0px"}} onClick={props.clicked}>
                    <img width="30" heigh="30" src={SearchIcon} alt="Search"/>
                </div>
                <NavLink to="/favorite" exact={props.exact}>
                    <div>
                        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns={HeartIcon}>
                            <path d={d} fill={color} ></path>
                        </svg>
                        <span style={countStyle}>{count}</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );

};

export default navigationItems;