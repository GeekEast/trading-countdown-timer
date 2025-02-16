import dayjs from 'dayjs';
import { calculateNextPeriodStart } from '../timeUtils';

describe('calculateNextPeriodStart', () => {
  it('当period为30分钟时，应该计算正确的下一个周期开始时间', () => {
    const currentTime = dayjs('2024-03-15 10:30:00');
    const result = calculateNextPeriodStart(currentTime, 30);
    expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 10:30:00');
  });

  it('当period为60分钟时，应该计算正确的下一个周期开始时间', () => {
    const currentTime = dayjs('2024-03-15 10:30:00');
    const result = calculateNextPeriodStart(currentTime, 60);
    expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 11:00:00');
  });

  it('当period为15分钟时，应该计算正确的下一个周期开始时间', () => {
    const currentTime = dayjs('2024-03-15 10:30:00');
    const result = calculateNextPeriodStart(currentTime, 15);
    expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 10:30:00');
  });

  it('应该处理跨天的情况', () => {
    const currentTime = dayjs('2024-03-15 23:45:00');
    const result = calculateNextPeriodStart(currentTime, 30);
    expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-16 00:00:00');
  });

  it('当前时间正好在周期开始时，应该计算正确的下一个周期开始时间', () => {
    const currentTime = dayjs('2024-03-15 00:00:00');
    const result = calculateNextPeriodStart(currentTime, 30);
    expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 00:00:00');
  });

  it('应该处理跨月情况', () => {
    const currentTime = dayjs('2024-03-31 23:45:00');
    const result = calculateNextPeriodStart(currentTime, 30);
    expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-04-01 00:00:00');
  });
});
