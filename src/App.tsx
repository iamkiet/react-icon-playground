import { useEffect, useRef, useState } from "react";
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
  const [idleTime, setIdleTime] = useState<number>(0);
  const idleTimerRef = useRef<number | null>(null);
  const lastMouseMoveRef = useRef<number>(Date.now());

  const handleReactIconClick = (): void => {
    setRotationDirection((prevDirection) => -prevDirection);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    lastMouseMoveRef.current = Date.now();
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

  useEffect(() => {
    const updateIdleTime = (): void => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMouseMoveRef.current;
      setIdleTime(timeSinceLastMove / 1000);
    };

    idleTimerRef.current = setInterval(updateIdleTime, 100);

    return () => {
      if (idleTimerRef.current) {
        clearInterval(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };
  }, []);

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
      <div className="info-banner-container">
        <p>Mouse idle time: {idleTime.toFixed(1)}s</p>
      </div>
    </div>
  );
}
