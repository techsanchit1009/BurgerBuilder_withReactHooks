import React from 'react';
import { NavLink } from 'react-router-dom';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = props => {
  return (
    <div className={classes.Logo} style={{height: '80%'}}>
      <NavLink to="/" exact>
        <img src={burgerLogo} alt="MyBurger"/>
      </NavLink>
    </div>
  );
};

export default logo;