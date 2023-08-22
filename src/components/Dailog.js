import React from 'react';
import CopyToClipboard from './CopyToClipboard'


const SummaryDialog = ({ content }) => (
  <div className="dialog">
    <CopyToClipboard message={content}/>
    <p>{content}</p>
  </div>
);



const MajorPointsDialog = ({ points }) => (
 
  <div className="dialog"> 
  
   <CopyToClipboard message={points}/>
    <ul>
      {points.map((points, index) => (
        <li key={index}>{points}</li>
      ))}
    </ul>
  </div>
);

const Dialog = ({ content }) => (
  <div>
    {typeof content === 'string' ? (
      <SummaryDialog content={content} />
    ) : (
      <MajorPointsDialog points={content} />
    )}
  </div>
);

export default Dialog;
