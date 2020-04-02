import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import { checkValidity } from "../../shared/validation";
import * as actions from "../../store/actions/index";

const auth = props => {
  const [authForm, setAuthForm] = useState({
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
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const [isSignup, setIsSignUp] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      }
    };
    let formIsValid = true;
    for (let controlName in updatedControls) {
      formIsValid = updatedControls[controlName].valid && formIsValid;
    }
    setAuthForm(updatedControls);
    setFormIsValid(formIsValid);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignup);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
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
      {errorMessage}
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
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
