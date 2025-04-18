function NextButton({dispatch, answer,numQuest,index}) {

    if(answer===null) return null;


    if(index<numQuest-1) return (
        <button className="btn btn-ui" onClick={()=>dispatch({type:'nextQuestion'})}>
            Next
        </button>
    )


    if(index===numQuest-1) return (
        <button className="btn btn-ui" onClick={()=>dispatch({type:'finish'})}>
            Finish
        </button>
    )
}

export default NextButton
