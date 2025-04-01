
function StartScreen({ numQuest ,dispatch}) {
  return (
    <div className="start">
      <h3>Welcome to react quiz</h3>
      <h3>{numQuest} Question to test your React mastery</h3>
      <button className="btn btn-ui"  onClick={()=>dispatch({type:"start"})}>Let's Start</button>
    </div>
  );
}

export default StartScreen;
