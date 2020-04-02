import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
 
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
          {props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>
          Your Order : ₹ {props.totalPrice}{" "}
          (incl of Taxes)
        </h3>
        <p>Delicious Burger with following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to Checkout?</p>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>
          CANCEL
        </Button>
      </Aux>
    );
}

export default orderSummary;
