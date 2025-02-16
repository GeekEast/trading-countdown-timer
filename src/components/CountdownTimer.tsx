import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 初始化 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);

interface CountdownTimerProps {
  timezone: string;
  period: number; // 以分钟为单位
  offset?: number; // 可选的偏移量（分钟）
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  timezone,
  period,
  offset = 0,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    const updateTime = () => {
      const now = dayjs();
      const nextPeriodStart = calculateNextPeriodStart(now, period, offset);
      
      setCurrentTime(now);
      if (isRunning) {
        // 使用 Math.ceil 来确保倒计时显示与当前时间同步
        const diff = Math.ceil(nextPeriodStart.diff(now, 'second', true));
        setTimeLeft(diff);
      }
    };

    // 立即执行一次更新
    updateTime();

    // 将 interval 设置为 100ms 以获得更精确的更新
    const intervalId = setInterval(updateTime, 100);

    return () => clearInterval(intervalId);
  }, [isRunning, period, offset]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const calculateNextPeriodStart = (
    currentTime: dayjs.Dayjs,
    period: number,
    offset: number
  ): dayjs.Dayjs => {
    // 将分钟转换为毫秒
    const periodMs = period * 60 * 1000;
    const offsetMs = offset * 60 * 1000;
    
    // 获取当前时间的时间戳
    const timestamp = currentTime.valueOf();
    
    // 计算距离下一个周期开始的时间
    const nextPeriodStart = Math.ceil((timestamp - offsetMs) / periodMs) * periodMs + offsetMs;
    
    return dayjs(nextPeriodStart);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-bold">
        {dayjs(currentTime).tz(timezone).format('HH:mm:ss')}
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
