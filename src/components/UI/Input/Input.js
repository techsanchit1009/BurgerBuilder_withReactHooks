import React, { useState } from "react";
import classes from './Input.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const input = props => {
  const [showPassword, setShowPassword] = useState(false);
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let validationError = null;

  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
    let errorMessage = '*Please enter a valid data!';
    if(props.elementType==='password'){
      errorMessage = 'Password must have atleast one number and atleast 4 characters';
    } 
    
    validationError = <p style={{
      textAlign: 'left',
      color:'red',
      fontSize: '12px',
      fontWeight: 'bold' 
    }}>{errorMessage}</p>;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "password":
      inputElement = (
        <div className={classes.Password}>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            type={showPassword ? 'text' : 'password'}
            value={props.value}
            onChange={props.changed}
          />
          <span onClick={() => setShowPassword(!showPassword)} className={classes.EyeIcon}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
