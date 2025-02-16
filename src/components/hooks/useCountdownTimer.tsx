import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { calculateNextPeriodStart } from '../../utils/timeUtils';

interface UseCountdownTimerProps {
  timezone: string;
  period: number;
}

export const useCountdownTimer = ({
  timezone,
  period,
}: UseCountdownTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(
    dayjs().tz(timezone)
  );

  useEffect(() => {
    const updateTime = () => {
      const now = dayjs().tz(timezone);
      const nextPeriodStart = calculateNextPeriodStart(now, period);

      setCurrentTime(now);
      if (isRunning) {
        const diff = Math.ceil(nextPeriodStart.diff(now, 'second', true));
        setTimeLeft(diff);
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [isRunning, period, timezone]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  return {
    isRunning,
    timeLeft,
    currentTime,
    handleStart,
    handleStop,
  };
};
