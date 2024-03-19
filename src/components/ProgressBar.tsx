import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    setBarWidth(100);
  }, []);

  return (
    <div className="relative h-5">
      <div className="absolute h-5 w-full  rounded-sm bg-gray-200"></div>
      <div
        style={{ width: `${barWidth}%` }}
        className="absolute h-5 rounded-sm bg-main-1 transition-all duration-700 ease-out"
      ></div>
    </div>
  );
};

export default ProgressBar;
