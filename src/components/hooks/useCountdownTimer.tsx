import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { calculateNextPeriodStart } from '../../utils/timeUtils';

// 初始化 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);

interface UseCountdownTimerProps {
  timezone: string;
  period: number;
  offset?: number;
}

export const useCountdownTimer = ({ timezone, period, offset = 0 }: UseCountdownTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs().tz(timezone));

  useEffect(() => {
    const updateTime = () => {
      const now = dayjs().tz(timezone);
      const nextPeriodStart = calculateNextPeriodStart(now, period, offset);

      setCurrentTime(now);
      if (isRunning) {
        const diff = Math.ceil(nextPeriodStart.diff(now, 'second', true));
        setTimeLeft(diff);
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [isRunning, period, offset, timezone]);

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
    handleStop
  };
};
