import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { checkValidity } from "../../shared/validation";
import * as actions from "../../store/actions/index";

const auth = props => {
  const [loginForm, setLoginForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email ID"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },

    password: {
      elementType: "password",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        isPassword: true
      },
      valid: false,
      touched: false
    }
  }); 

  const [signupForm, setSignupForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Full Name"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },

    phone: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Phone Number"
      },
      value: "",
      validation: {
        required: true,
        isPhone: true
      },
      valid: false,
      touched: false
    },

    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email ID"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },

    password: {
      elementType: "password",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        isPassword: true
      },
      valid: false,
      touched: false
    },
  }); 

  const [isSignup, setIsSignUp] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const formType = isSignup ? signupForm : loginForm;
  
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...formType,
      [controlName]: {
        ...formType[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          formType[controlName].validation
        ),
        touched: true
      }
    };
    let formIsValid = true;
    for (let controlName in updatedControls) {
      formIsValid = updatedControls[controlName].valid && formIsValid;
    }
    if(isSignup){
      setSignupForm(updatedControls)
    } else {
      setLoginForm(updatedControls);
    }
    setFormIsValid(formIsValid);
  };


  const submitHandler = event => {
    event.preventDefault();
    if(isSignup){
      const signupData = {
        name: signupForm.name.value,
        phone: signupForm.phone.value,
        email: signupForm.email.value
      }
      props.onAuth(formType.email.value, formType.password.value, isSignup, signupData);
    }
    else{
      props.onAuth(formType.email.value, formType.password.value, isSignup);
    }
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignup);
  };

  const formElementsArray = [];
  for (let key in formType) {
    formElementsArray.push({
      id: key,
      config: formType[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      shouldValidate={formElement.config.validation}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    if (props.error.message === "INVALID_EMAIL") {
      errorMessage = <p>Please enter a valid Email ID!</p>;
    } else if (props.error.message === "EMAIL_EXISTS") {
      errorMessage = <p>Email ID already exist!</p>;
    } else if (props.error.message === "INVALID_PASSWORD") {
      errorMessage = <p>Email ID and Password didn't match!</p>;
    } else if (props.error.message === "EMAIL_NOT_FOUND") {
      errorMessage = <p>Sorry! No such user found!</p>;
    } else {
      errorMessage = <p>{props.error.message}</p>;
    }
  }

  return (
    <div className={classes.Auth}>
      <h1 className={classes.Heading}>
        {isSignup ? "Create a new Account!" : "Login"}
      </h1>
      <p style={{ color: 'red', fontWeight: 'bold'}}>{errorMessage}</p>
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success" disabled={!formIsValid}>
          {!isSignup ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        {isSignup
          ? "Already have an account? Sign In"
          : "New User? Sign Up now!"}
      </Button>
      <a href="http://localhost:5000/auth/google">Google Login</a>
      {props.isAuthenitcated ? <Redirect to={props.authRedirectPath} /> : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenitcated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup, userData) =>
      dispatch(actions.auth(email, password, isSignup, userData)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
