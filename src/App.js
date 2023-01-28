import "./App.css"
import React from 'react'
// import data from './data'
import Questions from './Questions'
import Start from './Start'
import {nanoid} from 'nanoid'

export default function App(){

    //To make opening the app for the first time land in the start page
    const [start, setStart] = React.useState(false)

    //Loading data for the first time
    const [trivia, setTrivia] = React.useState([])
    // const [trivia, setTrivia] = React.useState(data.results)

    const [anotherGame, setAnotherGame] = React.useState()

    //Loading data from the API
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=17")
            .then(res => res.json())
            .then(data => setTrivia(data.results))
    }, [anotherGame])

    //Setting the checkingAnswers to false
    const [checkingAnswers, setCheckingAnswers] = React.useState(false)

    //Function for switching the start page to the quiz page
    function toggle(){
        setStart(prevState => !prevState)
    }

    //Mixing the correct answer with the incorrect answers
    React.useEffect(() =>{
        trivia.map(choices => {
        choices.incorrect_answers.splice(Math.floor(Math.random() * 4), 0, choices.correct_answer)
    })
    }, [trivia])

    //Restarting another game
    function playAgain(){
        setCheckingAnswers(prevAnswers => !prevAnswers)
        setStart(false)
        setAnotherGame(nanoid())
    }

    const answerElements = []
    //function for confirming answers
    //It adds the answers selected in the answerElements array
    function confirmAnswers(responses){
        if(answerElements.length === 0){
            answerElements.push(responses)
        }
        for(let i = 0; i < answerElements.length; i++){
            if(answerElements[i].questionid === responses.questionid){
                // answerElements[i].answer = responses.answer
                // for debugging purposes
                answerElements[i].correct = responses.correct
                break
            }
            else if(i === answerElements.length - 1){
                answerElements.push(responses)
            }
        }
    }

    //Setting the score to zero
    const [scored, setScored] = React.useState(0)

    //Flipping the state of checking answers
    //Can only check answers after answering all questions
    function checkAnswers(){
        if(answerElements.length === 5){
            setCheckingAnswers(prevState => !prevState) 
            const correctAnswers = []
            for(let i = 0; i < answerElements.length; i++){
                if(answerElements[i].correct){
                    correctAnswers.push(answerElements[i])
                }
            }
            //Updating the score
            setScored(correctAnswers.length)
        } 
    }

    //Passing the data to the Questions component
    const triviaElements = trivia.map(trivia => (
        < Questions 
        questionId={nanoid()}
        question={trivia.question}
        choice={trivia.incorrect_answers}
        cor_choice = {trivia.correct_answer}
        checkAnswer = {checkingAnswers}
        confirmAnswer = {confirmAnswers}
        />
    ))

    return(
        <div className="container">
            <main>
            {
                //Switching between start page and quiz page
            start ?
            triviaElements :
            < Start handleClick={toggle} />
            }
            {
                checkingAnswers ?
                start && <div className="play">
                    <p className="scores">You scored {scored}/5</p>
                    <button 
                    className="playAgain"
                    onClick={playAgain}
                    >
                        Play Again
                    </button>
                </div>:
                start && <button className="confirm" onClick={checkAnswers}>Check answers</button>
            }
            </main>
        </div>
    )
}


