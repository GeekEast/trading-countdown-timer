import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer';

const App: React.FC = () => {
  const [period, setPeriod] = useState<number>(5);
  const [offset, setOffset] = useState<number>(0);
  const [timezone, setTimezone] = useState<string>("Asia/Shanghai");

  // 常用时区列表
  const timezones = [
    { value: "Asia/Shanghai", label: "中国标准时间 (UTC+8) - 上海证券交易所" },
    { value: "Asia/Hong_Kong", label: "香港时间 (UTC+8) - 香港交易所" },
    { value: "Asia/Tokyo", label: "日本标准时间 (UTC+9) - 东京证券交易所" },
    { value: "Asia/Singapore", label: "新加坡时间 (UTC+8) - 新加坡交易所" },
    { value: "Europe/London", label: "英国标准时间 (UTC+0/+1) - 伦敦证券交易所" },
    { value: "Europe/Frankfurt", label: "中欧时间 (UTC+1/+2) - 法兰克福证券交易所" },
    { value: "America/New_York", label: "美国东部时间 (UTC-5/-4) - 纽约证券交易所" },
    { value: "America/Chicago", label: "美国中部时间 (UTC-6/-5) - 芝加哥商品交易所" },
    { value: "America/Toronto", label: "加拿大东部时间 (UTC-5/-4) - 多伦多证券交易所" },
    { value: "Australia/Sydney", label: "澳大利亚东部时间 (UTC+10/+11) - 澳大利亚证券交易所" }
  ];

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
            <option value={1}>1分钟</option>
            <option value={5}>5分钟</option>
            <option value={15}>15分钟</option>
            <option value={30}>30分钟</option>
          </select>
        </div>
        
        <div className="space-x-4">
          <label className="font-medium">偏移量（分钟）：</label>
          <input 
            type="number" 
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            min={0}
            max={period - 1}
            className="border rounded-md p-2 w-20"
          />
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

      <CountdownTimer 
        timezone={timezone} 
        period={period}
        offset={offset}
      />
    </div>
  );
};

export default App;
