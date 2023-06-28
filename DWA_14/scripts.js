import {LitElement,css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

// Constants for configuring the counter app
const MAX_NUMBER = 10;
const MIN_NUMBER = -5;
const STEP_AMOUNT = 1;
const RESET_AMOUNT = 0;

// DOM elements
const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');

console.log(number, subtract, add); // Logging the DOM elements for verification

// Event handler for subtract button click
const subtractHandler = () => {
  // Dispatch 'DECREMENT' action to the store
  store.dispatch({ type: 'DECREMENT' });
  console.log(store.getState());

  // Update the counter value displayed in the DOM
  const newValue = parseInt(number.value) - STEP_AMOUNT;
  number.value = newValue;

  // Manage the enabled/disabled state of add and subtract buttons
  if (add.disabled === true) {
    add.disabled = false;
  }

  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
  }
};

// Event handler for add button click
const addHandler = () => {
  // Dispatch 'INCREMENT' action to the store
  store.dispatch({ type: 'INCREMENT' });
  console.log(store.getState());

  // Update the counter value displayed in the DOM
  const newValue = parseInt(number.value) + STEP_AMOUNT;
  number.value = newValue;

  // Manage the enabled/disabled state of add and subtract buttons
  if (subtract.disabled === true) {
    subtract.disabled = false;
  }

  if (newValue >= MAX_NUMBER) {
    add.disabled = true;
  }
};

// Event handler for reset button click
const resetHandler = () => {
  // Dispatch 'RESET' action to the store
  store.dispatch({ type: 'RESET' });
  console.log(store.getState());

  // Reset the counter value displayed in the DOM
  const resetValue = parseInt(number.value);
  if (resetValue !== RESET_AMOUNT) {
    number.value = RESET_AMOUNT;
    alert("You have reset your tally amount to 0!");
  }
};


// Reducer function for updating the state
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
};

// Create the store
const createStore = (reducer) => {
  let state = reducer(undefined, {}); // Initialize the state from reducer 

  const getState = () => state; //returns the current state

  const dispatch = (action) => {
    state = reducer(state, action); //when dispathc is called it uses the reducer of the current state and action 
  };

  return { getState, dispatch };
};

const store = createStore(counterReducer);

// Event listeners for button clicks
subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);