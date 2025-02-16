import dayjs from 'dayjs';

export const calculateNextPeriodStart = (
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
  const nextPeriodStart =
    Math.ceil((timestamp - offsetMs) / periodMs) * periodMs + offsetMs;

  return dayjs(nextPeriodStart);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};
