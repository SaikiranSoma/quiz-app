import Header from "../components/Header";
import "../App.css";
import Main from "../components/Main";
import { useEffect, useReducer } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import StartScreen from "../components/StartScreen";
import Question from "../components/Question";
import NextButton from "./NextButton";
import Progress from "./Progress";

const initialstate = {
  questions: [],
  //"loading", "error","ready","active","finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  const numQuest = questions.length;
  const maxTotalpoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuest={numQuest} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuest}
              points={points}
              maxTotalpoints={maxTotalpoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />{" "}
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
