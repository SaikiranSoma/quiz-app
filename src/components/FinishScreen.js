function FinishScreen({ dispatch, points, maxTotalpoints, highscore }) {
  const percentage = (points / maxTotalpoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏅";
  if (percentage >= 80 && percentage < 100) emoji = "😎";
  if (percentage >= 50 && percentage < 80) emoji = "👏";
  if (percentage >= 0 && percentage < 50) emoji = "😌";

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxTotalpoints}{" "}
        {Math.ceil(percentage)}% {emoji}
      </p>
      <p className="highscore"> (HighScore : {highscore} points)</p>
      <button
        className="btn btn-option"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz 🔁
      </button>
    </>
  );
}

export default FinishScreen;
