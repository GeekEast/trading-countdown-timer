import dayjs from 'dayjs';

/**
 * 计算下一个周期的开始时间
 * @param currentTime - 当前时间（dayjs 对象）
 * @param period - 周期时长（分钟）
 * @returns 下一个周期的开始时间（dayjs 对象）
 * @example
 *    假设当前时间是 14:23，周期为 30 分钟
 *    则返回 14:30（下一个 30 分钟的开始时间点）
 * const nextStart = calculateNextPeriodStart(dayjs(), 30);
 */
export const calculateNextPeriodStart = (
  currentTime: dayjs.Dayjs,
  period: number
): dayjs.Dayjs => {
  // 将分钟转换为毫秒
  const periodMs = period * 60 * 1000;

  // 获取当前时间的时间戳
  const timestamp = currentTime.valueOf();

  // 计算距离下一个周期开始的时间
  const nextPeriodStart = Math.ceil(timestamp / periodMs) * periodMs;

  return dayjs(nextPeriodStart);
};

/**
 * 将秒数转换为时间字符串格式
 * @param seconds - 需要格式化的总秒数
 * @returns 格式化后的时间字符串。对于普通时间返回 "MM:SS" 格式，
 */
export const formatTime = (seconds: number): string => {
  // 处理无效输入
  if (!seconds || isNaN(seconds) || seconds < 0 || seconds > 3600) {
    return '00:00';
  }

  // 向下取整
  seconds = Math.floor(seconds);

  // 计算小时、分钟和秒
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};
