import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { calculateNextPeriodStart } from '../../utils/timeUtils';

interface UseCountdownTimerProps {
  timezone: string;
  period: number;
  onComplete?: () => void;
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
  const [audio] = useState(new Audio('/audio.mp3'));

  useEffect(() => {
    const updateTime = () => {
      const now = dayjs().tz(timezone);
      const nextPeriodStart = calculateNextPeriodStart(now, period);

      setCurrentTime(now);
      if (isRunning) {
        const diff = Math.ceil(nextPeriodStart.diff(now, 'second', true));
        setTimeLeft(diff);

        if (diff === 5) {
          audio.play();
        }

        if (diff <= 0) {
          setIsRunning(false);
        }
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [isRunning, period, timezone, audio]);

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
