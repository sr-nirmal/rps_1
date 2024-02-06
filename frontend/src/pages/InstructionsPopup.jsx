// InstructionsPopup.js
import React from 'react';
import videoSource from '../images/test1.mp4'; // Import the video source
import win from '../images/win.mp4'
import lose from '../images/lose.mp4'
// import draw from '../images/draw.mp4'
import './InstructionsPopup.css';

const InstructionManual = () => {
    return (
      <div className="instruction-manual">
        
        <div className="instruction-content">
          <div className="instruction-section">
            <h2>Objective:</h2>
            <p>The objective of the game is to defeat the computer by selecting a winning move from rock, paper, or scissors.</p>
          </div>
          <div className="instruction-section">
            <h2>How to Play:</h2>
            <ol>
              <li>Click on one of the buttons labeled "Rock", "Paper", or "Scissors" to make your move.</li>
              <li>The computer will randomly select its move.</li>
              <li>The game will determine the winner based on the following rules:</li>
              <ul>
                <li>Rock beats scissors</li>
                <li>Paper beats rock</li>
                <li>Scissors beats paper</li>
                <li>If both you and the computer choose the same move, it's a tie.</li>
              </ul>
              <li>The result will be displayed on the screen, indicating whether you won, lost, or tied with the computer.</li>
            </ol>
          </div>
          <div className="instruction-section">
            <h2>Rules:</h2>
            <ul>
              <li>Each round is played between the player and the computer.</li>
              <li>The player can only make one move per round by clicking on a button.</li>
              <li>The computer's move is randomly generated.</li>
              <li>The game continues until the player decides to stop playing.</li>
            </ul>
          </div>
          <div className="instruction-section">
            <h2>Tips:</h2>
            <ul>
              <li>Try to anticipate the computer's moves based on its previous choices.</li>
              <li>Keep track of your wins, losses, and ties to improve your strategy over time.</li>
              <li>Have fun and enjoy the game!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
// InstructionsPopup.js


const InstructionsPopup = ({ onClose }) => {
  return (
    <div className="popup big-popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="scrolling-text">
          <h1>Rock Paper Scissors Instruction Manual</h1>
          <div className="instruction-manual">
            <InstructionManual />
          </div>
        </div>
        <div className="video-container">
          {/* Remove controls attribute and disable pause/play functionality */}
          <video autoPlay loop muted>
            <source src={win} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video autoPlay loop muted>
            <source src={lose} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <video autoPlay loop muted>
            <source src={draw} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>
        {/* <button onClick={onClose}>Close</button> Close button inside the popup */}
      </div>
    </div>
  );
};

export default InstructionsPopup;



