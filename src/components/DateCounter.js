import { useReducer} from "react";

// function reducer(state, action) {
//   console.log(state, action);
//   if (action.type === "inc") return state + 1;
//   if (action.type === "dec") return state - 1;
//   if (action.type === "setCount") return action.payload;
// }
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(action, state);

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step};
    case "dec":
      return { ...state, count: state.count - state.step};
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep"  :
      return{...state,step:action.payload};
    case "reset":
      return initialState ;
    case "rapidincre":
      return {...state,count:state.count+365};  

    default:
      throw new Error("unknown action");
  }
  // if (action.type === "inc") return state + 1;
  // if (action.type === "dec") return state - 1;
  // if (action.type === "setCount") return action.payload;
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("april 1 2025");
  date.setDate(date.getDate() + count);

  function inc() {
    dispatch({ type: "inc" });
  }

  function dec() {
    dispatch({ type: "dec" });
  }

  function assignCount(e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  }


  function massincrement(){
    dispatch({type:"rapidincre"})
  }
  // const dec = function () {
  //   // setCount((count) => count - 1);
  //   // setCount((count) => count - step);
  //   dispatch({ type: "dec" });
  // };

  // const inc = function () {
  //   // setCount((count) => count + 1);
  //   // setCount((count) => count + step);
  //   dispatch({ type: "inc" });
  // };

  // const defineCount = function (e) {
  //   // setCount(Number(e.target.value));
  //   dispatch({ type: "setCount", payload: Number(e.target.value) });
  // };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({type:"reset"})
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={assignCount} />
        <button onClick={inc}>+</button>
        <button onClick={massincrement}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
