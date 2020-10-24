import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { combineReducers, createStore } from "redux";
import "./styles.css";
import { ActionCreators, applyUndo } from "react-redux-undo";

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

const listReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, `Item ${state.todos.length}`]
      };
    default:
      return state;
  }
};

const store = createStore(
  applyUndo(
    combineReducers({
      count: countReducer,
      todo: listReducer
    }),
    {
      maxHistory: 10
    }
  )
);

function Count() {
  const counter = useSelector((state) => state.count.counter);
  const list = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch({ type: "ADD" })}>ADD</button>
      <hr />
      <h1>Todos {list.length}</h1>
      {list.map((l, index) => (
        <p key={index}>{l}</p>
      ))}
      <button onClick={() => dispatch({ type: "ADD_TODO" })}>ADD</button>
      <hr />
      <button onClick={() => dispatch(ActionCreators.undo())}>Undo</button>
      <button onClick={() => dispatch(ActionCreators.clear())}>Clear</button>
      <button onClick={() => dispatch(ActionCreators.redo())}>Redo</button>
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
