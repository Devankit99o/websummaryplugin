import React, { useState } from 'react';
// import clipboard from 'clipboard-copy';


function CopyToClipboard(props) {
  const[copy,setcopy]=useState('Copy to Clipboard');
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
           
      console.log('Text copied to clipboard:', text);
       
      setcopy("Summary Copied!");
      setTimeout(() => {
        setcopy('Copy to Clipboard');
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };


  return (
    <div id='cpybtn' className='cpydv'>
      <button onClick={() => copyToClipboard(props.message)}>
       {copy}
      </button>
    </div>
  );
}

export default CopyToClipboard;
