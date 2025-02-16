import React from 'react';
import CountdownTimer from './components/CountdownTimer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 初始化 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <CountdownTimer />
    </div>
  );
};

export default App;
