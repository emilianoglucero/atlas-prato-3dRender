import { Plane } from "@react-three/drei";
import React, { useRef } from "react";

export const WalkingZone = ({ hoveredZone }) => {
  const ref = useRef();
  return (
    <group>
      {/* blue paint wall */}
      <mesh
        ref={ref}
        scale={[1, 0.9, 1]}
        rotation={[0, 1.5, 0]}
        position={[-1.94, 0, 0]}
      >
        <Plane args={[1, 2.3]}>
          <meshStandardMaterial
            attach="material"
            color={hoveredZone ? "hotpink" : "darkslateblue"}
          />
        </Plane>
      </mesh>

      {/* blue paint floor */}
      <mesh
        ref={ref}
        scale={[1, 1.6, 1]}
        rotation={[11, 0, 1.5]}
        position={[-0.8, -0.99, 0.08]}
      >
        <Plane args={[1, 2.3]}>
          <meshStandardMaterial
            attach="material"
            color={hoveredZone ? "hotpink" : "darkslateblue"}
          />
        </Plane>
      </mesh>
    </group>
  );
};
