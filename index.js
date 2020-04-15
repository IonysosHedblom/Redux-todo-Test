// Library Code, this code is closer to a library that you would download from NPM
function createStore(reducer) {
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

  // Dispatch is responsible for updating the state inside store.
  // The action argument is going to tell dispatch which specific event occured inside app.
  // Dispatch is called with an action
  // Whenever dispatch is called, allReducers function is invoked and app function is then going to invoke reducers
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  // Whenever createStore is invoked, return an object
  return {
    getState,
    subscribe,
    dispatch,
  };
}

// App Code -- This is code that the user might write to decide how the state should change based off of the action
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// This todos function, is also a REDUCER function. It takes a state and an action, and reducing that to a brand new state
// TODOS REDUCER
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    // If the action type is not ADD_TODO, REMOVE_TODO or TOGGLE_TODO just return the state
    default:
      return state;
  }
}

// GOALS REDUCER
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

// Combine reducers to pass to createStore function below.
// allreducers function invokes todos reducer and goals reducer, they return specific portions of state
// This is called a root REDUCER
function allReducers(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

const store = createStore(allReducers);
store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  },
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  },
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  },
});

store.dispatch({
  type: REMOVE_TODO,
  id: 1,
});

store.dispatch({
  type: TOGGLE_TODO,
  id: 0,
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux',
  },
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds',
  },
});

store.dispatch({
  type: REMOVE_GOAL,
  id: 0,
});
