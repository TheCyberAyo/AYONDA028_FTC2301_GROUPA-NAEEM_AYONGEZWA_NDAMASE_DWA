/**
 * Creates a store object for managing application state.
 * @param {function} reducer - A function that specifies how the state is updated based on actions.
 * @returns {object} The store object.
 */
const store = (reducer) => {
    let state;
  
    /**
     * Retrieves the current state.
     * @returns {*} The current state.
     */
    const fetchState = () => state;
  
    /**
     * Updates the state by dispatching an action to the reducer.
     * @param {*} action - The action to be dispatched.
     */
    const publish = (action) => {
      state = reducer(state, action);
    };
  
    /**
     * Retrieves the current state.
     * @returns {*} The current state.
     */
    const getState = () => fetchState();
  
    return {
      getState,
      publish
    };
  };
  
  /**
   * Reducer function that specifies how the state is updated based on actions.
   * @param {*} state - The current state.
   * @param {object} action - The action object.
   * @returns {*} The updated state.
   */
  const reducer = (state = 'Normal', action) => {
    const MAX_NUMBER = 10;
    const MIN_NUMBER = -10;
  
    switch (action.type) {
      case 'ADD':
        if (state === 'Minimum reached') {
          return 'Normal';
        } else if (state === 'Normal' && parseInt(number.value) + 1 >= MAX_NUMBER) {
          return 'Maximum reached';
        } else {
          return 'Normal';
        }
      case 'MINUS':
        if (state === 'Maximum reached') {
          return 'Normal';
        } else if (state === 'Normal' && parseInt(number.value) - 1 <= MIN_NUMBER) {
          return 'Minimum reached';
        } else {
          return 'Normal';
        }
      case 'RESET':
        return 'Normal';
      default:
        return state;
    }
  };
  
  // Create a store using the reducer
  const myStore = store(reducer);
  
  const number = document.querySelector('[data-key="number"]');
  const subtract = document.querySelector('[data-key="subtract"]');
  const add = document.querySelector('[data-key="add"]');
  const reset = document.querySelector('[data-key="reset"]');
  
  /**
   * Event handler for subtract button click.
   */
  const subtractHandler = () => {
    myStore.publish({ type: 'MINUS' });
    console.log(myStore.getState());
  
    const newValue = parseInt(number.value) - 1;
    number.value = newValue;
  
    subtract.disabled = newValue <= MIN_NUMBER;
    add.disabled = false;
  };
  
  /**
   * Event handler for add button click.
   */
  const addHandler = () => {
    myStore.publish({ type: 'ADD' });
    console.log(myStore.getState());
  
    const newValue = parseInt(number.value) + 1;
    number.value = newValue;
  
    subtract.disabled = false;
    add.disabled = newValue >= MAX_NUMBER;
  };
  
  /**
   * Event handler for reset button click.
   */
  const resetHandler = () => {
    myStore.publish({ type: 'RESET' });
    console.log(myStore.getState());
  
    const resetMsg = document.getElementById('reset-message');
    resetMsg.hidden = false;
  
    // Make the reset message disappear after a second.
    setTimeout(() => {
      resetMsg.hidden = true;
    }, 1250);
  
    add.disabled = false;
    subtract.disabled = false;
    number.value = 0;
  };
  
  // Add event listeners to buttons
  subtract.addEventListener('click', subtractHandler);
  add.addEventListener('click', addHandler);
  reset.addEventListener('click', resetHandler);