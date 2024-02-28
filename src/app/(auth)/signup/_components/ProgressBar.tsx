import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    setBarWidth(100);
  }, []);

  return (
    <div className="relative ml-10 h-3 max-w-xl overflow-hidden rounded-full">
      <div className="absolute h-full w-full bg-gray-200"></div>
      <div
        style={{ width: `${barWidth}%` }}
        className="relative h-full bg-main-1 transition-all duration-700 ease-out"
      ></div>
    </div>
  );
};

export default ProgressBar;
