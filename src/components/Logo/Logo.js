import React from 'react';

import burgerLogo from '../../assets/images/logo.svg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt={"Logo"} />
    </div>
);

export default logo;