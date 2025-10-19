import { describe, it, expect } from 'vitest';
import { getReactIconSize } from './getReactIconSize';
import { ICON_SIZES } from '../constants';
import type { CursorPosition } from '../types';

describe('getReactIconSize', () => {
  const windowWidth = 1920;
  const windowHeight = 1080;

  it('should return default size when cursor sizing is disabled', () => {
    const cursorPosition: CursorPosition = { x: 100, y: 100 };
    const result = getReactIconSize(false, cursorPosition, windowWidth, windowHeight);
    expect(result).toBe(ICON_SIZES.DEFAULT);
  });

  it('should return minimum size when cursor is at origin', () => {
    const cursorPosition: CursorPosition = { x: 0, y: 0 };
    const result = getReactIconSize(true, cursorPosition, windowWidth, windowHeight);
    expect(result).toBe(ICON_SIZES.MIN);
  });

  it('should return maximum size when cursor is at corner', () => {
    const cursorPosition: CursorPosition = { x: windowWidth, y: windowHeight };
    const result = getReactIconSize(true, cursorPosition, windowWidth, windowHeight);
    expect(result).toBe(ICON_SIZES.MAX);
  });

  it('should return size between min and max for center position', () => {
    const cursorPosition: CursorPosition = { x: windowWidth / 2, y: windowHeight / 2 };
    const result = getReactIconSize(true, cursorPosition, windowWidth, windowHeight);
    expect(result).toBeGreaterThan(ICON_SIZES.MIN);
    expect(result).toBeLessThan(ICON_SIZES.MAX);
  });
});
