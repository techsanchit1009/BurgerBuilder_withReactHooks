import React, { useState } from "react";
import { connect } from 'react-redux';
import Button from "../../../components/UI/Button/Button";
import { withRouter } from "react-router-dom";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactDetails.css";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../shared/validation';
import * as orderActions from '../../../store/actions/index';

const contactDetails = props => {
     const [orderForm, setOrderForm] = useState({
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Full Name"
        },
        value: props.userData.name,
        validation: {
          required: true
        },
        valid: true,
        touched: true
      },

      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6
        },
        valid: false,
        touched: false
      },

      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City"
        },
        value: "",
        validation: {
          required: true
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
        value: props.userData.email,
        validation: {
          required: true,
          isEmail: true
        },
        valid: true,
        touched: true,
      },

      paymentMode: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "cash", displayValue: "Cash on Delivery" },
            { value: "card", displayValue: "Visa / MasterCard" },
            { value: "upi", displayValue: "Bhim UPI" }
          ]
        },
        value: "cash",
        validation:{},
        valid: true
      }
    });
    const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    // alert('Continue Clicked');

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    console.log(formData);
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      orderId: new Date().getTime().toString()
    };
    // console.log(order);
    props.onOrderBurger(order, props.userId);

  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      });
    }
    
    let form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            disabled={formElement.config.disabled}
            shouldValidate={formElement.config.validation}
            changed={event => inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
      </form>
    );

    if (props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactDetails}>
        <h4>Enter your contact details!</h4>
        {form}
      </div>
    );
}

const mapStateToProps = state => {
  console.log(state);
  return { 
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    userData: state.auth.userData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger:(orderData, userId) => dispatch(orderActions.purchaseBurger(orderData, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(contactDetails, axios)));
