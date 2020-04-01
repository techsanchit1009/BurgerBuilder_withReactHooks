import React, { Component } from "react";
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

class ContactDetails extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Full Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
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
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      paymentMode: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "cash", displayValue: "Cash on Delivery" },
            { value: "card", displayValue: "Visa/ MasterCard" },
            { value: "upi", displayValue: "Bhim UPI" }
          ]
        },
        value: "cash",
        validation:{},
        valid: true
      }
    },
    formIsValid: false
  };

  componentDidMount() {
    console.log(this.props);
  }

  orderHandler = event => {
    event.preventDefault();
    // alert('Continue Clicked');

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    console.log(formData);
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    console.log(order);
    this.props.onOrderBurger(order, this.props.token);

  };

  


  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    // console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      // if(!formIsValid){
      //   break;
      // }
    }
    
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
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
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactDetails}>
        <h4>Enter your contact details!</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger:(orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactDetails, axios)));
