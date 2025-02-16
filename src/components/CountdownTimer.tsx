import React, { useState } from 'react';
import { formatTime } from '../utils/timeUtils';
import { useCountdownTimer } from './hooks/useCountdownTimer';
import { timezones } from '../utils/timezones';

const PERIOD_OPTIONS = [
  { value: 1, label: '1分钟' },
  { value: 2, label: '2分钟' },
  { value: 5, label: '5分钟' },
  { value: 15, label: '15分钟' },
  { value: 30, label: '30分钟' },
  { value: 60, label: '1小时' },
] as const;

const CountdownTimer: React.FC = () => {
  const [period, setPeriod] = useState<number>(5);
  const [timezone, setTimezone] = useState<string>(timezones[0].value);

  const { isRunning, timeLeft, currentTime, handleStart, handleStop } =
    useCountdownTimer({
      timezone,
      period,
    });

  return (
    <div className="flex flex-col items-center space-y-8 p-8 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
      <h1 className="text-[24px] font-medium text-[rgba(0,0,0,0.85)]">
        Trading Countdown Timer
      </h1>
      <div className="space-y-6 w-full">
        <div className="flex items-center">
          <label className="text-[rgba(0,0,0,0.85)] w-20">Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="border border-[#d9d9d9] rounded-md px-3 py-1 min-w-[200px] text-base hover:border-[#40a9ff] focus:border-[#40a9ff] focus:outline-none focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all"
          >
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-[rgba(0,0,0,0.85)] w-20">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="border border-[#d9d9d9] rounded-md px-3 py-1 min-w-[200px] text-base hover:border-[#40a9ff] focus:border-[#40a9ff] focus:outline-none focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all"
          >
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-[32px] text-[#000000] font-medium">
        {currentTime.format('HH:mm:ss')}
      </div>
      <div
        className={`text-[48px] font-mono ${
          timeLeft <= period * 60 * 0.04 ? 'text-[#ff4d4f]' : 'text-[#000000]'
        }`}
      >
        {formatTime(timeLeft)}
      </div>
      <div className="space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-[6px] bg-[#1890ff] text-white rounded-[2px] text-base hover:bg-[#40a9ff] disabled:bg-[#f5f5f5] disabled:text-[rgba(0,0,0,0.25)] disabled:border-[#d9d9d9] disabled:cursor-not-allowed transition-all"
        >
          开始
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="px-4 py-[6px] bg-[#ff4d4f] text-white rounded-[2px] text-base hover:bg-[#ff7875] disabled:bg-[#f5f5f5] disabled:text-[rgba(0,0,0,0.25)] disabled:border-[#d9d9d9] disabled:cursor-not-allowed transition-all"
        >
          停止
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
