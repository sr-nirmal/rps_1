// MainPage.js
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './MainPage.css';
import rockImageL from '../images/rock_left.png';
import paperImageL from '../images/paper_left.png';
import scissorsImageL from '../images/scissors_left.png';
import rockImageR from '../images/rock_right.png';
import paperImageR from '../images/paper_right.png';
import scissorsImageR from '../images/scissors_right.png';
import userGif from '../images/user_animation.gif';
import computerGif from '../images/computer_animation.gif';

const MainPage = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [userMove, setUserMove] = useState(-1);
  const [computerMove, setComputerMove] = useState(-1);
  const rock = 0;
  const paper = 1;
  const scissor = 2;

  const handleUserChoice = (userChoice) => {
    console.log(userChoice);
    fetch('http://localhost:8080/play', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": userName , "move" : userChoice})
      })
      .then(response => response.json())
      .then(data => {
        console.log( userChoice +" "+ data.computer +" " + data.result);
          if(data.result === -1){
            setComputerScore(computerScore + 1);
          }
          else if(data.result === 1){
            setUserScore(userScore + 1);
          }
          setUserMove(userChoice);
          setComputerMove(data.computer);
          // data.computer -> computer's move
        
      })

      .catch(error => {
          console.error('Error:', error);
      });
  };
  function reset(){
    setUserMove(-1);
    setComputerMove(-1);
  }

  function ChoiceButtons(){
    return(
      <div className="buttons-container">
        <button className="game-button" onClick={() => handleUserChoice(rock)}>
          <img src={rockImageL} alt="Rock" className="button-image" />
        </button>
        <button className="game-button" onClick={() => handleUserChoice(paper)}>
          <img src={paperImageL} alt="Paper" className="button-image" />
        </button>
        <button className="game-button" onClick={() => handleUserChoice(scissor)}>
          <img src={scissorsImageL} alt="Scissors" className="button-image" />
        </button>
        
      </div>
    );
  }

  function ResultPopup(){
  return(
    <div className='result-box'>
      <div className='box'>
          this is popup
          <button className="game-button" onClick={reset}>Proceed</button>
      </div>

    </div>
  )

  }


  return (
    <div className="main-page">
      <div className="game-container">
        <div className="game-section">
        <div className="score-label">{userName}'s Score: {userScore}</div>
          <div className="user-gif">

          {userMove === -1 && <img src={userGif} alt="Rock" className="button-image" /> }
          {userMove === 0 && <img src={rockImageL} alt="Rock" className="button-image" /> }
          {userMove === 1 && <img src={paperImageL} alt="Paper" className="button-image" /> }
          {userMove === 2 && <img src={scissorsImageL} alt="Scissors" className="button-image" /> }
          



          </div>
          
          <ChoiceButtons /> 
          
        </div>

        <div className="divider"></div>

        <div className="game-section">
          <div className="score-label">Computer Score: {computerScore}</div>
          <div className="computer-gif">

          {computerMove === -1 && <img src={computerGif} alt="Rock" className="button-image" />}
          {computerMove === 0 && <img src={rockImageR} alt="Rock" className="button-image" />}
          {computerMove === 1 && <img src={paperImageR} alt="Rock" className="button-image" />}
          {computerMove === 2 && <img src={scissorsImageR} alt="Rock" className="button-image" />}
          
          </div>
          
        </div>
      </div>
      {userMove !== -1 && computerMove !== -1 && <ResultPopup/>}
    </div>
  );
};

export default MainPage;
