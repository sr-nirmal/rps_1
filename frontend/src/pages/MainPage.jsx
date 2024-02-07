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
  const [chances, setChances] = useState(1);
  const rock = 0;
  const paper = 1;
  const scissor = 2;
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const[resultState,setResultState]=useState(2)
  const[historyArray, setHistory] = useState([]);
  const [refreshHistory, setRefreshHistory] = useState(1);
  const [finalToggle, setFinal] = useState(0);
  const [showHistory,setshowHistory] = useState(0);



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
        console.log(chances +" --- " +data.chances);
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
          // setChances(data.chances);
          console.log("chances -- >" +chances+" "+data.chances)
          
        }

        else if(data.stat === "finish"){
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
          // setFinal(1);
          // test
        }
        if(chances === 10){
          setTimeout(() => {
        setFinal(1);
      }, 3000);
        }
          setTimeout(() => {
            setShowResultPopup(true);
          },1000);
      
        setResultState(data.result);
        
      })

      .catch(error => {
          console.error('Error:', error);
          // test for commit
      });


      

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
    if (chances!=10)
    {
      setChances(chances + 1);
      setUserMove(-1);
      setComputerMove(-1);
      setShowResultPopup(false);
      setButtonDisabled(false);
    }
    
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
    setTimeout(() => {
      reset();
    },1000);
  return(
      <div className='result-label'>
      {resultState===-1 && <h1 className="you-win-text lose-color" data-text="YOU LOSE">YOU LOSE</h1>}
      {resultState===0 && <h1 className="you-win-text draw-color" data-text="DRAW">DRAW</h1>}
      {resultState===1 && <h1 className="you-win-text win-color" data-text="YOU WIN">YOU WIN</h1>}
      </div>
  )



  }

  function resetGame(){
    reset();
    fetchHistory();
    setUserMove(-1);
    setComputerMove(-1);
    setChances(1);
    setComputerScore(0);
    setUserScore(0);
    setFinal(0);
    setButtonDisabled(false);


  }

  function FinalPopup(){
    return(
      <div className='result-box' >
        <div className='box' >
        {computerScore > userScore   && <h1 className="label-style label-size" data-text="COMPUTER WINS">COMPUTER WINS</h1>}
      {computerScore === userScore  && <h1 className="label-style label-size" data-text="DRAW">DRAW</h1>}
      {computerScore < userScore  && <h1 className="label-style label-size" data-text="YOU WIN">YOU WIN</h1>}
       
            <button className="proceed-button round-4" onClick={resetGame}>Play Again</button>
            
        </div>
  
      </div>
    )
  
    }

  function HistoryDisplay(){

    return(
      <div className='result-box'>
      {/* Add a small button here */}
      
      <div>
        <button className="top-left-button" onClick={()=>setshowHistory(0)} >
        <span>&larr;</span> 
        </button>
      </div>
      <div className="table-container">
      
      
        <div className="table-header">
          <div className="table-cell"><strong>W</strong></div>
          <div className="table-cell"><strong>L</strong></div>
          <div className="table-cell"><strong>D</strong></div>
          <div className="table-cell date-column"><strong>Date</strong></div>
        </div>
    
        {historyArray.map((item, index) => (
          <div key={index} className="table-row">
            <div className="table-cell">{item.wins}</div>
            <div className="table-cell">{item.loses}</div>
            <div className="table-cell">{item.draws}</div>
            <div className="table-cell date-column">{item.date}</div>
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
      <div className='backbutton-container'>
      <button className="backButton" onClick={() => navigate("/")}>
      <span>&larr;</span> 
    </button>
      </div>
      <div className="score-label">
        <h2 className='label-style'>{userName}'s Score: {userScore}</h2>
        <h2 className='label-style'> Computer Score: {computerScore}</h2> 
        </div>
      <div className="chance-label">
        <h2 className='label-style'>Round : {chances}/10 </h2>
        </div>
      <div className='result-container'>
      {userMove !== -1 && computerMove !== -1 && showResultPopup && finalToggle === 0 && <div className='result-box'/>&& <ResultPopup/> }
        </div>

      <div className="game-container">
        
        
          <div className="user-gif">

          {userMove === -1 && <img src={userGif} alt="Rock" className="output-image" /> }
          {userMove === 0 && <img src={rockImageL} alt="Rock" className="output-image" /> }
          {userMove === 1 && <img src={paperImageL} alt="Paper" className="output-image" /> }
          {userMove === 2 && <img src={scissorsImageL} alt="Scissors" className="output-image" /> }
          </div>
        <div className="divider"></div>
            <div className="computer-gif">

            {computerMove === -1 && <img src={computerGif} alt="Rock" className=".output-image" />}
            {computerMove === 0 && <img src={rockImageR} alt="Rock" className=".output-image" />}
            {computerMove === 1 && <img src={paperImageR} alt="Rock" className="output-image" />}
            {computerMove === 2 && <img src={scissorsImageR} alt="Rock" className=".output-image" />}
            
            </div>
      </div>
      <ChoiceButtons />
      <div className='history-button-container'>
      <button className="view-history" on onClick={()=>setshowHistory(1)}>
      <span>View History</span> 
    </button>
      </div>
      {finalToggle === 1 && <FinalPopup/> }
      {showHistory===1 && <HistoryDisplay/>}
      {/* {userMove !== -1 && computerMove !== -1 && showResultPopup && <div className='result-box'/>&& <ResultPopup/> } */}
    </div>
  );
};

export default MainPage;
