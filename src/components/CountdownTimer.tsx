import React from 'react';
import { formatTime } from '../utils/timeUtils';
import { useCountdownTimer } from './hooks/useCountdownTimer';

interface CountdownTimerProps {
  timezone: string;
  period: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  timezone,
  period,
}) => {
  const {
    isRunning,
    timeLeft,
    currentTime,
    handleStart,
    handleStop
  } = useCountdownTimer({ timezone, period });

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-bold">
        {currentTime.format('HH:mm:ss')}
      </div>
      <div className="text-4xl font-mono">{formatTime(timeLeft)}</div>
      <div className="space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-300"
        >
          开始
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="px-4 py-2 bg-red-500 text-white rounded-md disabled:bg-gray-300"
        >
          停止
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
