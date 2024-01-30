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

  const handleUserChoice = (userChoice) => {
    // Add game logic here based on userChoice and computer's choice
    // Update userScore and computerScore accordingly
  };

  return (
    <div className="main-page">
      <div className="game-container">
        <div className="game-section">
        <div className="score-label">{userName}'s Score: {userScore}</div>
          <div className="user-gif">
          <img src={userGif} alt="Rock" className="button-image" />
          </div>
          <div className="buttons-container">
            <button className="game-button" onClick={() => handleUserChoice('rock')}>
              <img src={rockImage} alt="Rock" className="button-image" />
            </button>
            <button className="game-button" onClick={() => handleUserChoice('paper')}>
              <img src={paperImage} alt="Paper" className="button-image" />
            </button>
            <button className="game-button" onClick={() => handleUserChoice('scissors')}>
              <img src={scissorsImage} alt="Scissors" className="button-image" />
            </button>
          </div>
          
        </div>

        <div className="divider"></div>

        <div className="game-section">
          <div className="score-label">Computer Score: {computerScore}</div>
          <div className="computer-gif">
          <img src={computerGif} alt="Rock" className="button-image" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MainPage;
