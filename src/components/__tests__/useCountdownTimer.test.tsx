import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCountdownTimer } from '../hooks/useCountdownTimer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 配置 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);

describe('useCountdownTimer', () => {
  beforeEach(() => {
    // 固定当前时间为 2024-01-01 12:00:00
    vi.useFakeTimers();
    const mockDate = new Date('2024-01-01T12:00:00Z');
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('应该正确初始化计时器状态', () => {
    const { result } = renderHook(() => 
      useCountdownTimer({ 
        timezone: 'UTC', 
        period: 3600, // 1小时
        offset: 0 
      })
    );

    expect(result.current.isRunning).toBe(false);
    expect(result.current.timeLeft).toBe(0);
    expect(dayjs.isDayjs(result.current.currentTime)).toBe(true);
  });

  it('应该在启动时开始倒计时', () => {
    const { result } = renderHook(() => 
      useCountdownTimer({ 
        timezone: 'UTC', 
        period: 3600,
        offset: 0 
      })
    );

    act(() => {
      result.current.handleStart();
    });

    expect(result.current.isRunning).toBe(true);
    expect(result.current.timeLeft).toBeGreaterThan(0);
  });

  it('应该在停止时重置计时器', () => {
    const { result } = renderHook(() => 
      useCountdownTimer({ 
        timezone: 'UTC', 
        period: 3600,
        offset: 0 
      })
    );

    act(() => {
      result.current.handleStart();
      result.current.handleStop();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.timeLeft).toBe(0);
  });

  it('应该随时间推移更新倒计时', async () => {
    const { result } = renderHook(() => 
      useCountdownTimer({ 
        timezone: 'UTC', 
        period: 3600,
        offset: 0 
      })
    );

    act(() => {
      result.current.handleStart();
    });

    const initialTimeLeft = result.current.timeLeft;

    act(() => {
      vi.advanceTimersByTime(1000); // 前进1秒
    });

    expect(result.current.timeLeft).toBeLessThan(initialTimeLeft);
  });

  it('应该考虑时区设置', () => {
    const { result } = renderHook(() => 
      useCountdownTimer({ 
        timezone: 'Asia/Shanghai', 
        period: 3600,
        offset: 0 
      })
    );

    // 检查当前时间是否正确转换为上海时区
    const shanghaiTime = dayjs('2024-01-01T12:00:00Z').tz('Asia/Shanghai');
    expect(result.current.currentTime.format()).toBe(shanghaiTime.format());
    expect(result.current.currentTime.utcOffset()).toBe(480); // 上海是 UTC+8，所以偏移量是 480 分钟
  });
}); 