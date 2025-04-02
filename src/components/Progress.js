function Progress({ index, numQuestion, points, maxTotalpoints ,answer}) {
  return (
    <header className="progress">

        <progress max={numQuestion} value={index+Number(answer!==null)} />
      <p>
        Question <strong> {index + 1}</strong> / {numQuestion}
      </p>
      <p>
        Points <strong>{points}</strong> / {maxTotalpoints}
      </p>
    </header>
  );
}

export default Progress;
