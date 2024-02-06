// MainPage.js
import React, { useEffect, useState } from 'react';
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
  const [chances, setChances] = useState(0);
  const rock = 0;
  const paper = 1;
  const scissor = 2;
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const[resultState,setResultState]=useState(2)
  const[historyArray, setHistory] = useState([]);
  const [refreshHistory, setRefreshHistory] = useState(1);
  const [finalToggle, setFinal] = useState(0);



  const handleUserChoice = (userChoice) => {
    setButtonDisabled(true);
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
        console.log( userChoice +" "+ data.computer +" " + data.result +" "+data.chances + " " + data.stat);
        if(data.stat === "proceed"){
          if(data.result === -1){
            setComputerScore(computerScore + 1);
          }
          else if(data.result === 1){
            setUserScore(userScore + 1);
          }
          setUserMove(userChoice);
          setComputerMove(data.computer);
          setChances(data.chances);
          console.log("chances -- >" +chances+" "+data.chances)
          if(data.chances === 9){
            setFinal(1);
            
          }
        }

        else{
          if(data.result === -1){
            setComputerScore(computerScore + 1);
          }
          else if(data.result === 1){
            setUserScore(userScore + 1);
          }
          setUserMove(userChoice);
          setComputerMove(data.computer);
          //setChances(0);          
          fetchHistory();
          // test
        }
        setResultState(data.result);
        
      })

      .catch(error => {
          console.error('Error:', error);
      });


      setTimeout(() => {
        setShowResultPopup(true);
      }, 1000);

  };

  function fetchHistory(){
    console.log("hello.....")
    fetch('http://localhost:8080/history', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": userName})
      })
      .then(response => response.json())
      .then(data => {
    
        
        setHistory(data);
        console.log(historyArray);
        tempPrint();


  
      })

      .catch(error => {
          console.error('Error:', error);
      });

  }
  function tempPrint(){
    for( const temp of historyArray){
      console.log(temp);
    }
  }
  
  function reset(){
    setUserMove(-1);
    setComputerMove(-1);
    setShowResultPopup(false);
    setButtonDisabled(false);
  }

  function ChoiceButtons(){
    return(
      <div className='button-box'>
      <div className="buttons-container">
        <button className="game-button round-4" onClick={() => handleUserChoice(rock)} disabled={isButtonDisabled}>
          <img src={rockImageL} alt="Rock" className="button-image" />
        </button>
        <button className="game-button round-4" onClick={() => handleUserChoice(paper)} disabled={isButtonDisabled} >
          <img src={paperImageL} alt="Paper" className="button-image" />
        </button>
        <button className="game-button round-4" onClick={() => handleUserChoice(scissor)} disabled={isButtonDisabled}>
          <img src={scissorsImageL} alt="Scissors" className="button-image" />
        </button>
        
      </div>
      </div>
    );
  }

  function ResultPopup(){
  return(
    <div className='result-box' >
      <div className='box' >
      {resultState===-1 && <h1 className="you-win-text" data-text="YOU LOSE">YOU LOSE</h1>}
      {resultState===0 && <h1 className="you-win-text" data-text="DRAW">DRAW</h1>}
      {resultState===1 && <h1 className="you-win-text" data-text="YOU WIN">YOU WIN</h1>}
     
          <button className="proceed-button round-4" onClick={reset}>Proceed</button>
      </div>

    </div>
  )


  }

  function resetGame(){
    reset();
    fetchHistory();
    setUserMove(-1);
    setComputerMove(-1);
    setChances(10);
    setComputerScore(0);
    setUserScore(0);
    setFinal(0);


  }

  function FinalPopup(){
    return(
      <div className='result-box' >
        <div className='box' >
        {userScore < computerScore && <h1 className="you-win-text" data-text="YOU LOSE">YOU LOSE</h1>}
        {userScore === computerScore && <h1 className="you-win-text" data-text="DRAW">DRAW</h1>}
        {userScore > computerScore && <h1 className="you-win-text" data-text="YOU WIN">YOU WIN</h1>}
       
            <button className="proceed-button round-4" onClick={resetGame}>New Game</button>
            <button className="proceed-button round-4" onClick={() => navigate("/")}>Back</button>
        </div>
  
      </div>
    )
  
    }

  function HistoryDisplay(){

    return(
      <div>
        {/* <button onClick={fetchHistory}>Fetch</button> */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
          <strong>Wins</strong>
        </div>
        <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
          <strong>Loses</strong>
        </div>
        <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
          <strong>Draws</strong>
        </div>
        <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
          <strong>Score</strong>
        </div>
        <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
          <strong>Date</strong>
        </div>
      </div>

      {historyArray.map((item, index) => (
        <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
          <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
            {item.wins}
          </div>
          <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
            {item.loses}
          </div>
          <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
            {item.draws}
          </div>
          <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
            {item.score}
          </div>
          <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>
            {item.date}
          </div>
        </div>
      ))}
    </div>

      </div>
    );
  }

  if(refreshHistory === 1){
    fetchHistory();
    setRefreshHistory(0);
  }
 

  return (
    <div className="main-page">
      <HistoryDisplay />
      <div className="game-container">
        <div className="game-section">
        <div className="score-label">{userName}'s Score: {userScore} </div>
        <div className="score-label">Chances : {10 - chances} </div>
          <div className="user-gif">

          {userMove === -1 && <img src={userGif} alt="Rock" className=".output-image" /> }
          {userMove === 0 && <img src={rockImageL} alt="Rock" className=".output-image" /> }
          {userMove === 1 && <img src={paperImageL} alt="Paper" className=".output-image" /> }
          {userMove === 2 && <img src={scissorsImageL} alt="Scissors" className=".output-image" /> }
          



          </div>
          
          <ChoiceButtons /> 
          
        </div>

        <div className="divider"></div>
        <div className="computer-side">
          <div className="computer-gap"></div>
          <div className="game-section">
            <div className="score-label">Computer Score: {computerScore}</div>
            <div className="score-space"> </div>
            <div className="computer-gif">

            {computerMove === -1 && <img src={computerGif} alt="Rock" className=".output-image" />}
            {computerMove === 0 && <img src={rockImageR} alt="Rock" className=".output-image" />}
            {computerMove === 1 && <img src={paperImageR} alt="Rock" className="output-image" />}
            {computerMove === 2 && <img src={scissorsImageR} alt="Rock" className=".output-image" />}
            
            </div>
            
          </div>
        </div>
      </div>
      {userMove !== -1 && computerMove !== -1 && showResultPopup && finalToggle === 0 && <div className='result-box'/>&& <ResultPopup/> }
      {userMove !== -1 && computerMove !== -1 && showResultPopup && finalToggle === 1 && <div className='result-box'/>&& <FinalPopup/> }
      {/* {userMove !== -1 && computerMove !== -1 && showResultPopup && <div className='result-box'/>&& <ResultPopup/> } */}
    </div>
  );
};

export default MainPage;
