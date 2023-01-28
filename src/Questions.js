import React from 'react'
import {nanoid} from 'nanoid'

export default function Questions(props){

    //Creating an object from choices array to add id and isClicked elements
    // And initializing it in a react state
    const [optionObj, setOptionObj] = React.useState(
        props.choice.map(options =>({
            id:nanoid(),
            option:options,
            isClicked:false,
            //Checks whether the choice is correct or not
            isCorrect: props.cor_choice === options
        }))
    ) 

    //function for identifying the option selected
    //It resets the option object and flips isClicked
    //Value from true to false and vice versa
    function handleClick(event, id){
        setOptionObj(prevOptionObj => prevOptionObj.map(
            prevOption => {
                return prevOption.id === id ?
                {...prevOption, isClicked:true}:
                {...prevOption, isClicked:false}
            }
        ))

        //Returning the answers selected to the parent component
        optionObj.map(answers => {
            if(answers.id === id){
                props.confirmAnswer({
                    questionid:props.questionId,
                    // answer:answers.option,
                    // for debugging purposes
                    correct:answers.isCorrect
                })
            }
        })
    }

    //Shown to display the options for one to answer
    const choiceElements = optionObj.map(answers => (
         <button 
        onClick={(event) => handleClick(event, answers.id)} 
        // Changing the background color of option depending on whether
        // it has been clicked or not.
        
        style = {{
            backgroundColor : answers.isClicked ? 
            "#D6DBF5" :
            "#F5F7FB"
        }}
        className="question--choice"
        value={answers.option}
        >
            {answers.option}
        </button>
    ))
    
    // Shown when confirming whether answers are correct
    const answerElements = optionObj.map(answers => (
        <button 
        style = {
            answers.isClicked?
            {
                backgroundColor: answers.isCorrect?
                "#94D7A2":
                "#F8BCBC"
            }:
            {
                backgroundColor: answers.isCorrect?
                "#94D7A2":
                "#F5F7FB"
            }
        }
        className="question--choice"
        value={answers.option}
        >
            {answers.option}
        </button>
    ))    

    return(
        <section>
            <p className="question--prompt">{props.question}</p>
            {
                props.checkAnswer?
                answerElements :
                choiceElements
            }
        </section>
    )
}