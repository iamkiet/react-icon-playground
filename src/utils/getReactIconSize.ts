import { ICON_SIZES } from '../constants';
import type { CursorPosition } from '../types';

export const getReactIconSize = (
  isCursorSizingEnabled: boolean,
  cursorPosition: CursorPosition,
  windowWidth: number = window.innerWidth,
  windowHeight: number = window.innerHeight
): number => {
  if (!isCursorSizingEnabled) {
    return ICON_SIZES.DEFAULT;
  }

  const distance = Math.sqrt(
    Math.pow(cursorPosition.x, 2) + Math.pow(cursorPosition.y, 2)
  );
  const maxDistance = Math.sqrt(
    Math.pow(windowWidth, 2) + Math.pow(windowHeight, 2)
  );

  const sizeRatio = distance / maxDistance;
  const size = ICON_SIZES.MIN + sizeRatio * (ICON_SIZES.MAX - ICON_SIZES.MIN);

  return size;
};
