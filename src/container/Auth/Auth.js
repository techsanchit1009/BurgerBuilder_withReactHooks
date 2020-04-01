import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
 
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { checkValidity } from '../../shared/validation';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true,
    formIsValid: false
  };

  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
      this.props.onSetAuthRedirectPath();
    }
  }


  inputChangedHandler = (event, controlName) => { 
    const updatedControls = {
      ...this.state.controls,
      [controlName]:{
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    let formIsValid = true;
    for(let controlName in updatedControls){
      formIsValid = updatedControls[controlName].valid && formIsValid;
    }
    this.setState({controls: updatedControls, formIsValid: formIsValid});
  }


  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
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
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if(this.props.loading){
      form = <Spinner />;
    }

    let errorMessage = null;
    if(this.props.error){
      if(this.props.error.message === 'INVALID_EMAIL'){
        errorMessage = <p>Please enter a valid Email ID!</p>;
      }
      else if(this.props.error.message === 'EMAIL_EXISTS'){
        errorMessage = <p>Email ID already exist!</p>;
      }
      else if(this.props.error.message === 'INVALID_PASSWORD'){
        errorMessage = <p>Email ID and Password didn't match!</p>;
      }
      else if(this.props.error.message === 'EMAIL_NOT_FOUND'){
        errorMessage = <p>Sorry! No such user found!</p>;
      }
      
      else{
        errorMessage = <p>{this.props.error.message}</p>
      }
    }

    return (
      <div className={classes.Auth}>
        <h1 className={classes.Heading}>{this.state.isSignup? 'Create a new Account!' : 'Login'}</h1>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button 
              btnType="Success"
              disabled={!this.state.formIsValid}>{!this.state.isSignup? 'Login': 'Sign up'}</Button>
        </form>
        <Button 
            clicked={this.switchAuthModeHandler}
            btnType="Danger">{this.state.isSignup? 'Already have an account? Sign In': 'New User? Sign Up now!'}</Button>
        {this.props.isAuthenitcated ? <Redirect to={this.props.authRedirectPath} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenitcated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath:() => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
