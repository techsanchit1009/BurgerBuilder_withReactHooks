import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = name => {
  return {
    type:actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};


export const removeIngredient = name => {
  return {
    type:actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {  
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return{
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('http://localhost:5000/burgerIng')
        .then(resp => {
          dispatch(setIngredients(resp.data));
        })
        .catch(err => {
          console.log(err.response);
          dispatch(fetchIngredientsFailed());
        })  
  };
};