// TypingLoop.jsx
import React, { useState, useEffect } from 'react';

const TypingLoop = ({ text = "Hello, world!", speed = 100, pause = 1000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (!isDeleting && index <= text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, index));
        setIndex(index + 1);
      }, speed);
    } else if (isDeleting && index >= 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, index));
        setIndex(index - 1);
      }, speed);
    }

    if (index === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    }

    if (index < 0 && isDeleting) {
      setIsDeleting(false);
      setIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed, pause]);

  return (
    <div className="text-2xl font-mono text-primary">
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default TypingLoop;
