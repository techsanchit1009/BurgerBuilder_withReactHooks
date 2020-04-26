import * as actionTypes from './actionTypes';
import firebase from '../../Firestore';

const db = firebase.firestore();

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
    db.collection('ingredients').doc('ingredients')
      .get().then(snapshot => {
        dispatch(setIngredients(snapshot.data()));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};