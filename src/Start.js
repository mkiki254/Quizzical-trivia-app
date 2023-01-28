import React from 'react'

export default function Start(props){
    return(
        <div className="start">
            <p className="start--title">Quizzical</p>
            <p className="start--description">Some description if needed</p>
            <button className="start--button" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}