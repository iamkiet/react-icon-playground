import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  ANIMATION_DIRECTIONS,
  ROTATION_DIRECTIONS,
} from "./constants";
import type { CursorPosition } from "./types";
import { getReactIconSize } from "./utils/getReactIconSize";

export default function App() {
  const [rotationDirection, setRotationDirection] = useState<number>(
    ROTATION_DIRECTIONS.CLOCKWISE
  );
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [idleTime, setIdleTime] = useState<number>(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMouseMoveRef = useRef<number>(Date.now());

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isRotatingEnabled, setIsRotatingEnabled] = useState<boolean>(true);
  const [isCursorSizingEnabled, setIsCursorSizingEnabled] =
    useState<boolean>(true);
  const [isIdleCounterEnabled, setIsIdleCounterEnabled] =
    useState<boolean>(true);

  const handleReactIconClick = (): void => {
    setRotationDirection((prevDirection) => -prevDirection);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    lastMouseMoveRef.current = Date.now();
    if (isIdleCounterEnabled) {
      setIdleTime(0);
    }
  };

  const handleGlobalMouseMove = (): void => {
    lastMouseMoveRef.current = Date.now();
    if (isIdleCounterEnabled) {
      setIdleTime(0);
    }
  };

  const getAnimationDirection = (): string => {
    return rotationDirection === ROTATION_DIRECTIONS.CLOCKWISE
      ? ANIMATION_DIRECTIONS.NORMAL
      : ANIMATION_DIRECTIONS.REVERSE;
  };

  const getReactIconSizeValue = (): number => {
    return getReactIconSize(isCursorSizingEnabled, cursorPosition);
  };

  useEffect(() => {
    if (!isIdleCounterEnabled) {
      setIdleTime(0);
      if (idleTimerRef.current) {
        clearInterval(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      return;
    }

    setIdleTime(0);
    lastMouseMoveRef.current = Date.now();

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
  }, [isIdleCounterEnabled]);

  useEffect(() => {
    if (isIdleCounterEnabled) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
      };
    }
  }, [isIdleCounterEnabled, handleGlobalMouseMove]);

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <button
              className="logo-icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <img 
                src={reactLogo} 
                alt="Menu" 
                className="sidebar-header-icon"
                style={{ width: '24px', height: '24px' }}
              />
            </button>
            {isSidebarOpen && <span className="logo-text">Settings</span>}
          </div>
        </div>

        <div className="toggle-section">
          <div
            className={`toggle-item ${
              isCursorSizingEnabled ? "active" : "inactive"
            }`}
            data-tooltip="Cursor Sizing"
          >
            <span className="toggle-icon">C</span>
            {isSidebarOpen && (
              <span className="toggle-text">Cursor Sizing</span>
            )}
            {isSidebarOpen && (
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="cursor-sizing"
                  checked={isCursorSizingEnabled}
                  onChange={(e) => setIsCursorSizingEnabled(e.target.checked)}
                />
                <label htmlFor="cursor-sizing" className="toggle-label"></label>
              </div>
            )}
          </div>

          <div
            className={`toggle-item ${
              isIdleCounterEnabled ? "active" : "inactive"
            }`}
            data-tooltip="Idle Counter"
          >
            <span className="toggle-icon">I</span>
            {isSidebarOpen && <span className="toggle-text">Idle Counter</span>}
            {isSidebarOpen && (
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="idle-counter"
                  checked={isIdleCounterEnabled}
                  onChange={(e) => setIsIdleCounterEnabled(e.target.checked)}
                />
                <label htmlFor="idle-counter" className="toggle-label"></label>
              </div>
            )}
          </div>

          <div
            className={`toggle-item ${
              isRotatingEnabled ? "active" : "inactive"
            }`}
            data-tooltip="Rotation"
          >
            <span className="toggle-icon">R</span>
            {isSidebarOpen && <span className="toggle-text">Rotation</span>}
            {isSidebarOpen && (
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="rotation"
                  checked={isRotatingEnabled}
                  onChange={(e) => setIsRotatingEnabled(e.target.checked)}
                />
                <label htmlFor="rotation" className="toggle-label"></label>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="react-logo-container">
        <img
          className={`react-logo ${isRotatingEnabled ? "rotating" : ""}`}
          src={reactLogo}
          alt="React Logo"
          onClick={handleReactIconClick}
          style={{
            height: `${getReactIconSizeValue()}px`,
            animationDirection: getAnimationDirection(),
          }}
        />
      </div>
      
      <div className="info-banner">
        <div className="info-item">
          <span className={`info-text ${isCursorSizingEnabled ? "active" : "inactive"}`}>
            Cursor Sizing: {isCursorSizingEnabled ? `${getReactIconSizeValue().toFixed(1)}px` : "Disabled"}
          </span>
        </div>
        <div className="info-item">
          <span className={`info-text ${isIdleCounterEnabled ? "active" : "inactive"}`}>
            Idle Counter: {isIdleCounterEnabled ? `${idleTime.toFixed(1)}s` : "Disabled"}
          </span>
        </div>
        <div className="info-item">
          <span className={`info-text ${isRotatingEnabled ? "active" : "inactive"}`}>
            Rotation: {isRotatingEnabled 
              ? rotationDirection === ROTATION_DIRECTIONS.CLOCKWISE ? "Clockwise" : "Counter-clockwise"
              : "Disabled"}
          </span>
        </div>
      </div>
    </div>
  );
}
