import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ANIMATION_DIRECTIONS, ROTATION_DIRECTIONS } from "./constants";

export default function App() {
  const [rotationDirection, setRotationDirection] = useState<number>(
    ROTATION_DIRECTIONS.CLOCKWISE
  );

  const handleReactIconClick = (): void => {
    setRotationDirection((prevDirection) => -prevDirection);
  };

  const getAnimationDirection = (): string => {
    return rotationDirection === ROTATION_DIRECTIONS.CLOCKWISE
      ? ANIMATION_DIRECTIONS.NORMAL
      : ANIMATION_DIRECTIONS.REVERSE;
  };

  return (
    <div className="app">
      <div className="react-logo-container">
        <img
          className="react-logo rotating"
          src={reactLogo}
          alt="React Logo"
          onClick={handleReactIconClick}
          style={{
            height: 350,
            animationDirection: getAnimationDirection(),
          }}
        />
      </div>
    </div>
  );
}
