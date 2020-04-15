// Pure function, based on the specific action that occurs return a new copy of the internal state.
// Sets the default value of state to an empty array, otherwise state.concat wont work.
// This todos function, is also a REDUCER function. It takes a state and an action, and reducing that to a brand new state
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo]);
  }
  // If the action type is not ADD_TODO, just return the state
  return state;
}

function createStore() {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  // The state (nr 1)
  let state;
  let listeners = [];

  // Get the state (nr 2)
  const getState = () => state;

  // A way to listen to changes on the state (nr 3)
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // Dispatch is responsible for updating the state inside store. The action argument is going to tell dispatch which specific event occured inside app.
  const dispatch = action => {
    state = todos(state, action);
    listeners.forEach(listener => listener());
  };

  // Whenever createStore is invoked, return an object
  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore();

// Subscribe method
store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});
