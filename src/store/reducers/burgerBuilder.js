import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  lettuce: 20,
  cheese: 40,
  meat: 60,
  onion: 30,
  tomato: 30
};

const initialState = {
  ingredients: null,
  totalPrice: 50,
  ingPrice: INGREDIENT_PRICES,
  error: false,
  building: false,
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    
    case actionTypes.SET_INGREDIENTS:
      return{ 
        ...state,
        ingredients: action.ingredients,
        error:false,
        totalPrice: 50,
        building: false


        // To set the order to display the orders 

        // ingredients: {
        //   lettuce: action.ingredients.lettuce,
        //   cheese: action.ingredients.cheese,
        //   onion:action.ingredients.onion,
        //   tomato:action.ingredients.tomato,
        //   meat:action.ingredients.meat,
        // },
      };
    
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      }

    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      } 
      return updateObject(state, updatedState);

    case actionTypes.REMOVE_INGREDIENT:
      return{
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      building: true
      };
    


    default:
      return state;
  }
};

export default reducer;