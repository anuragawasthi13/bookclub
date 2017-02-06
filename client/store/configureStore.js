import {createStore,applyMiddleware,compose} from "redux";
import thunkMiddleware from "redux-thunk";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createLogger from "redux-logger";
import reducer from "./../reducers/index";

export default function configureStore(initialState) {
  const middewares = [
    // Add other middleware on this line...
    createLogger(),
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
  ];
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );
  return store;
}