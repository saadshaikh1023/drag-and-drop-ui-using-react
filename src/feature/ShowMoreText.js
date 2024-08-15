import React, { useState } from 'react';

const ShowMoreText = ({ text, maxWords = 3 }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

  const wordsArray = text.split(' ');
  const displayText = showMore ? text : wordsArray.slice(0, maxWords).join(' ') + '...';

  return (
    <div style={{ textAlign: 'center', wordWrap: 'break-word' }}>
      <span>{displayText}</span>
      {wordsArray.length > maxWords && (
        <button onClick={toggleShowMore} className="show-more-button">
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default ShowMoreText;
