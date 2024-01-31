// HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import title from '../images/home_title.jpg';
import buttonImage from '../images/playbutton.jpg';
// import axios from 'axios'


// export const apiClient = axios.create(
//   {
//       baseURL: 'http://localhost:8080'
//   }
// );

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

    fetch('http://localhost:8080/start', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": userName })
      })
      .then(response => response.json())
      .then(data => {
          console.log("logged in");
          console.log(data);
          navigate(`/main-page/${userName}`);
        
      })

      .catch(error => {
          console.error('Error:', error);
      });
   
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
