import React, { useState, useEffect } from 'react';

const Banner = ({ promotion }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(promotion.endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="banner">
      {promotion.isActive && (
        <div>
          <h2>{promotion.title}</h2>
          <p>{promotion.description}</p>
          <div className="time-left">
            {Object.keys(timeLeft).map((interval) => (
              <span key={interval}>
                {timeLeft[interval]} {interval}{' '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;