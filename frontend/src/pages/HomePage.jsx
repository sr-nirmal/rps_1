// HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import title from '../images/home_title.jpg';
import buttonImage from '../images/playbutton.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);

  const [userName, setUserName] = useState(''); // Add state for user name

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleButtonClick = () => {
    console.log('Button clicked!');
    setIsPressed((prev) => !prev);
    //name request
    navigate(`/main-page/${userName}`);
  };

  return (
    <div className="home-page">
      <img
        className="title_image"
        src={title}
        alt="Rock Paper Scissors"
      />
       <div className="entry-box">
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={handleInputChange}
        />
      </div>
      <img
        src={buttonImage}
        alt="Start Game"
        className={`start-button ${isPressed ? 'pressed' : ''}`}
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default HomePage;
