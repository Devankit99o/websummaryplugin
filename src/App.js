import React, { useState } from 'react';
import './App.css'; // Make sure to import your CSS file if you have one
import OverlayButtons from './components/OverlayButtons';
import Dialog from './components/Dailog';


const App = () => {
  const [dialogContent, setDialogContent] = useState(null);
  // const [currentUrl,setcurrentUrl]=useState("");

  const handleButtonClick = (content) => {
    setDialogContent(content);
  };
  // /* global chrome */
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   const currentUrl = tabs[0].url;
  //   console.log('app.js url',currentUrl);
  //   setcurrentUrl(currentUrl);
  // });
 
  const [message, setMessage] = useState("");
  const handleApiButtonClick = () => {
    const url ='https://www.unthinkable.co/'; // Replace with your desired URL

    fetch("http://localhost:8000/msg", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
    .then((res) => res.text()) // Parse the response as text
    .then((data) => setMessage(data))

      .catch((error) => { 
        if (!navigator.onLine) {
            console.log('Network Error: Internet connection lost.');
          } else {
            console.error('Network Error:', error.message);
          }   
        
      });
  };


  return (
    <div className="app" >
        {/* <p>{message}</p> */}
        <button onClick={handleApiButtonClick} className='urlbtn'  >Submit URL</button>
      <OverlayButtons onButtonClick={handleButtonClick} message={message} />
      {dialogContent && <Dialog content={dialogContent}  />}
    
    </div>
  );
};

export default App;

