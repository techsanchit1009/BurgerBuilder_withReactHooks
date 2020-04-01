import React from "react";
import classes from "./Order.css";



const order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span className={classes.Ingredients}
          key={ig.name}>{ig.name}({ig.amount})</span>;
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      {ingredientOutput}
      <p>
        Price: <strong>₹ {props.totalPrice}</strong>
      </p>
      <p style={{color: '#aaa'}}>Ordered By: {props.buyer}</p>
      <button className={classes.Delete} onClick={props.delete}>cancel order</button>
    </div>
  );
};



export default order;
