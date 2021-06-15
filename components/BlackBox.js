import React, { useRef, useState } from "react";
import { a, config, useSpring } from "@react-spring/three";
import { Box } from "@react-three/drei";

export const BlackBox = ({ hoveredBox }) => {
  // console.log(hoveredBox);
  const ref = useRef();

  const blackbox = useSpring({
    scale: hoveredBox ? [0.6, 0.16, 0.16] : [0.3, 0.08, 0.08],
    position: hoveredBox ? [-1.7, 0.12, 0] : [-1.93, 0.12, 0],
    rotation: [0, 1.5, 0],
    config: config.wobbly,
  });
  return (
    <a.mesh
      ref={ref}
      // scale={[0.3, 0.08, 0.08]}
      // rotation={[0, 1.5, 0]}
      // position={[-1.95, 0.12, 0]}
      {...blackbox}
    >
      <Box>
        <meshBasicMaterial attach="material" color="black" />
      </Box>
    </a.mesh>
  );
};
