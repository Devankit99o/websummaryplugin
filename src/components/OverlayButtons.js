import React from 'react';


const OverlayButtons = ({ onButtonClick,message }) => {
  // message=message.slice(0,1000);
  const summaryContent = message;
  function splitTextIntoArray(text, maxLength) {
    const words = text.split(' ');
    const result = [];
    let currentString = '';
  
    for (const word of words) {
      if ((currentString + ' ' + word).length <= maxLength) {
        currentString += (currentString === '' ? '' : ' ') + word;
      } else {
        result.push(currentString);
        currentString = word;
      }
    }
  
    if (currentString) {
      result.push(currentString);
    }
  
    return result;
  }
   
  const inputText =message;
  const maxLength =200;
  
  const textLines = splitTextIntoArray(inputText, maxLength);
  
  return (
    <>
    
   
    <div className="overlay" id="extbtn">
      <button onClick={() => onButtonClick(summaryContent)}>Provide Summary</button>
      <button onClick={() => onButtonClick(textLines)}>Provide Major Points</button>
    </div>
    </>

  );
};

export default OverlayButtons;
