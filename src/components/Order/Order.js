import React from "react";
import classes from "./Order.css";



const order = props => {
  const ingredients = [];

  const formatTime = (orderTime) => {
    let fullTimeArr = new Date(orderTime).toString().split(" ");
    let date = `${fullTimeArr[2]} ${fullTimeArr[1]}, ${fullTimeArr[3]}  `;
    let timeArr = fullTimeArr[4].split(":");
    let meridian = "AM";
    if (timeArr[0] > 12) {
      timeArr[0] -= 12;
      meridian = "PM";
    }
    let timeString = `${timeArr[0]}:${timeArr[1]} ${meridian}`;
    return `${date}  ${timeString}`;
  };

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    if(ig.amount){
      return <span className={classes.Ingredients}
            key={ig.name}>{ig.name} &times;{ig.amount}</span>;
    }
    return '';
  });

  return (
    <div className={classes.Order}>
      <div className={classes.OrderInfo}>
        <p style={{color: '#aaa'}}>Order ID: {props.orderId}</p>
        <p style={{color: '#aaa'}}>Order Date: {formatTime(parseInt(props.orderId,10))}</p>
      </div>
      <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Ingredients:</p>
      {ingredientOutput}
      <p>
        Price: <strong>₹ {props.totalPrice}</strong>
      </p>
      <p style={{color: '#aaa'}}>Ordered By: {props.buyer}</p>
      {props.status === 'cancelled' ? (<div className={classes.CancelledOrder}>CANCELLED</div>) : ''}
      {props.status !== 'cancelled'? (<button className={classes.Delete} onClick={() => props.delete()}>cancel order</button>): ''}
    </div>
  );
};



export default order;
