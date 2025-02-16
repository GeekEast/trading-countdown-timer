import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer';
import { timezones } from './utils/timezones';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 初始化 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);

const PERIOD_OPTIONS = [
  { value: 1, label: '1分钟' },
  { value: 2, label: '2分钟' },
  { value: 5, label: '5分钟' },
  { value: 15, label: '15分钟' },
  { value: 30, label: '30分钟' },
  { value: 60, label: '1小时' },
] as const;

const App: React.FC = () => {
  const [period, setPeriod] = useState<number>(5);
  const [timezone, setTimezone] = useState<string>(timezones[0].value);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-6 space-y-4">
        <div className="space-x-4">
          <label className="font-medium">周期：</label>
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="border rounded-md p-2"
          >
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-x-4">
          <label className="font-medium">时区：</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="border rounded-md p-2"
          >
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CountdownTimer timezone={timezone} period={period} />
    </div>
  );
};

export default App;
