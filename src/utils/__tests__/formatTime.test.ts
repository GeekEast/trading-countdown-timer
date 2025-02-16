import { formatTime } from '../timeUtils';

describe('formatTime', () => {
  it('应该正确格式化秒数为 MM:SS 格式', () => {
    // 测试整分钟
    expect(formatTime(60)).toBe('01:00');
    
    // 测试分钟和秒
    expect(formatTime(90)).toBe('01:30');
    
    // 测试只有秒
    expect(formatTime(45)).toBe('00:45');
    
    // 测试个位数秒
    expect(formatTime(65)).toBe('01:05');
    
    // 测试零秒
    expect(formatTime(0)).toBe('00:00');
    
    // 测试较大的数值
    expect(formatTime(3661)).toBe('00:00');
  });

  it('应该正确处理边界情况', () => {
    // 测试非整数（向下取整）
    expect(formatTime(90.5)).toBe('01:30');
    
    // 测试负数
    expect(formatTime(-30)).toBe('00:00');
    
    // 测试 NaN
    expect(formatTime(NaN)).toBe('00:00');
  });
}); 