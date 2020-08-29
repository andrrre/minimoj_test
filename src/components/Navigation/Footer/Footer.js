import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import classes from './Footer.css';
import burgerLogo from '../../../assets/images/logo.svg';
import Logo from '../../Logo/Logo';

const Footer = (props) => {


    return (
        <div className={classes.Footer}>
            <div className={classes.Hiden}>
                <img src={burgerLogo} alt={"Logo"} />
                <p>We're a growing family of 282 
                    designers and makers from around the world. 
                    Minimoj is sharing its profit to a non-profit 
                    organization.</p>
            </div>
            <div className={classes.OurStory}>
                <p>Our story</p>
                <ul>
                    <li><NavLink to="/">Contact us</NavLink></li>
                    <li><NavLink to="/">Policy</NavLink></li>
                </ul>
            </div>

            <div className={classes.NewsSubscriber}>
                    <p>You can subscribe on our newsletters!</p>
                <div>
                    <input
                    className={classes.InputEmail}
                    placeholder='Your email'
                    value={props.value}
                    onChange={props.changed} />
                    <button>Sign Up</button>
                </div>
            </div>
            <div className={classes.Year}>
                <span>© 2020 Minimoj</span>
                <NavLink to="/">Policy</NavLink>
            </div>
        </div>
    );
}

export default withRouter(Footer);