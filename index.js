function createStore () {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen tio changes on the state
  // 4. Update the state


  // The state (nr 1)
  let state;
  let listeners = [];

  // Get the state (nr 2)
  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    }
  };

  // Whenever createStore is invoked, return an object
  return {
    getState,
    subscribe
  }
};

const store = createStore();


// Subscribe method
store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});
