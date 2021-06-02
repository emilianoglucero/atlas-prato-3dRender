import { useTrail, animated } from "@react-spring/web";
import React from "react";
import styles from "../styles/Trail.module.css";
export const Trail = ({ style, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 2, tension: 2000, friction: 200, duration: 120 },
    opacity: 1,
    y: 0,
    height: 110,
    from: { opacity: 0, y: 60, height: 0 },
  });
  return (
    <span className={style}>
      {trail.map(({ height, ...style }, index) => (
        <animated.span key={index} style={style}>
          <animated.span style={{ height }}>{items[index]}</animated.span>
        </animated.span>
      ))}
    </span>
  );
};
