import React from 'react';
import classes from './Backdrop.css'

const backdrop = props => (
  props.show ? 
  <div className={classes.Backdrop} >
    <span className={classes.closeBtn} onClick={props.clicked}>&times;</span>
  </div> : null
);

export default backdrop;