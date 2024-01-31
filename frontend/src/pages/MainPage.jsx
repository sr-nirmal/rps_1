// MainPage.js
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './MainPage.css';
import rockImage from '../images/rock_left.png';
import paperImage from '../images/paper_left.png';
import scissorsImage from '../images/scissors_left.png';
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
    // Add game logic here based on userChoice and computer's choice
    // Update userScore and computerScore accordingly
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
          <img src={rockImage} alt="Rock" className="button-image" />
        </button>
        <button className="game-button" onClick={() => handleUserChoice(paper)}>
          <img src={paperImage} alt="Paper" className="button-image" />
        </button>
        <button className="game-button" onClick={() => handleUserChoice(scissor)}>
          <img src={scissorsImage} alt="Scissors" className="button-image" />
        </button>
        
      </div>
    );
  }


  return (
    <div className="main-page">
      <div className="game-container">
        <div className="game-section">
        <div className="score-label">{userName}'s Score: {userScore}</div>
          <div className="user-gif">

          {userMove === -1 && <img src={userGif} alt="Rock" className="button-image" /> }
          {userMove === 0 && <img src={rockImage} alt="Rock" className="button-image" /> }
          {userMove === 1 && <img src={paperImage} alt="Rock" className="button-image" /> }
          {userMove === 2 && <img src={scissorsImage} alt="Rock" className="button-image" /> }
          



          </div>
          
          {userMove === -1 && computerMove === -1 && <ChoiceButtons /> }
          {userMove !== -1 && computerMove !== -1 && <button className="game-button" onClick={reset}>
          Proceed
        </button> }
        </div>

        <div className="divider"></div>

        <div className="game-section">
          <div className="score-label">Computer Score: {computerScore}</div>
          <div className="computer-gif">

          {computerMove === -1 && <img src={computerGif} alt="Rock" className="button-image" />}
          {computerMove === 0 && <img src={rockImage} alt="Rock" className="button-image" />}
          {computerMove === 1 && <img src={paperImage} alt="Rock" className="button-image" />}
          {computerMove === 2 && <img src={scissorsImage} alt="Rock" className="button-image" />}
          
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MainPage;
