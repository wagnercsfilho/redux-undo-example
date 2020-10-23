import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import "./styles.css";
import { ActionCreators, applyUndo, undoMiddeware } from "react-redux-undo";

const countReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        counter: state.counter + 1
      };
    default:
      return state;
  }
};

const store = createStore(
  applyUndo(
    combineReducers({
      count: countReducer
    })
  ),
  applyMiddleware(undoMiddeware())
);

function Count() {
  const counter = useSelector((state) => state.count.counter);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch({ type: "ADD" })}>ADD</button>
      <button onClick={() => dispatch(ActionCreators.undo())}>UNDO</button>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Count />
    </Provider>
  );
}
