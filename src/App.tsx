import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  ANIMATION_DIRECTIONS,
  ICON_SIZES,
  ROTATION_DIRECTIONS,
} from "./constants";
import type { CursorPosition } from "./types";

export default function App() {
  const [rotationDirection, setRotationDirection] = useState<number>(
    ROTATION_DIRECTIONS.CLOCKWISE
  );
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });

  const handleReactIconClick = (): void => {
    setRotationDirection((prevDirection) => -prevDirection);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const getAnimationDirection = (): string => {
    return rotationDirection === ROTATION_DIRECTIONS.CLOCKWISE
      ? ANIMATION_DIRECTIONS.NORMAL
      : ANIMATION_DIRECTIONS.REVERSE;
  };

  const getReactIconSize = (): string => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const distance = Math.sqrt(
      Math.pow(cursorPosition.x, 2) + Math.pow(cursorPosition.y, 2)
    );
    const maxDistance = Math.sqrt(
      Math.pow(windowWidth, 2) + Math.pow(windowHeight, 2)
    );

    const sizeRatio = distance / maxDistance;
    const size = ICON_SIZES.MIN + sizeRatio * (ICON_SIZES.MAX - ICON_SIZES.MIN);

    return `${size}px`;
  };

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      <div className="react-logo-container">
        <img
          className="react-logo rotating"
          src={reactLogo}
          alt="React Logo"
          onClick={handleReactIconClick}
          style={{
            height: getReactIconSize(),
            animationDirection: getAnimationDirection(),
          }}
        />
      </div>
    </div>
  );
}
