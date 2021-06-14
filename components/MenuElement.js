import { Html, TorusKnot } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

function MenuElement({ text, color, args, ...props }) {
  const vec = new THREE.Vector3();
  const [hovered, setHover] = useState(false);
  const [zoom, set] = useState(false);

  useFrame((state) => {
    const step = 0.1;
    state.camera.fov = THREE.MathUtils.lerp(
      state.camera.fov,
      zoom ? 10 : 50,
      step
    );
    state.camera.position.lerp(
      vec.set(zoom ? 25 : 2.2, zoom ? 1 : 1, zoom ? 0 : 4),
      step
    );
    //state.camera.rotation.x += 0.01;
    state.camera.lookAt(-3, 0, -2);
    state.camera.updateProjectionMatrix();
    // light.current.position.lerp(
    //   vec.set(zoom ? 4 : 0, zoom ? 3 : 8, zoom ? 3 : 5),
    //   step
    // );
  });
  return (
    <TorusKnot
      {...props}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      onClick={() => set(!zoom)}
      //   scale={[0.15, 0.15, 0.15]}
      rotation={[0, 1, 0]}
    >
      {/* <boxGeometry args={args} /> */}
      <meshStandardMaterial color={hovered ? "hotpink" : color} />
      <Html
        // distanceFactor={50}
        transform={true}
        style={{
          transition: "all 0.2s",
          fontSize: "58px",
        }}
        as="div"
        position={[0, 0, 0]}
        className="label"
        center
      >
        {text}
      </Html>
    </TorusKnot>
  );
}

export default MenuElement;
