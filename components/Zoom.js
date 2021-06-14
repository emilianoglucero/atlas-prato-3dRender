import { Shadow } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Button() {
  console.log(zoom);
  const vec = new THREE.Vector3();
  const light = useRef();
  const [active, setActive] = useState(false);
  const [zoom, set] = useState(false);
  useEffect(
    () => void (document.body.style.cursor = active ? "pointer" : "auto"),
    [active]
  );

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
    light.current.position.lerp(
      vec.set(zoom ? 4 : 0, zoom ? 3 : 8, zoom ? 3 : 5),
      step
    );
  });

  return (
    <mesh
      receiveShadow
      castShadow
      onClick={() => set(!zoom)}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
    >
      <sphereBufferGeometry args={[0.75, 64, 64]} />
      <meshPhysicalMaterial
        color={active ? "purple" : "#e7b056"}
        clearcoat={1}
        clearcoatRoughness={0}
      />
      <Shadow
        position-y={-0.79}
        rotation-x={-Math.PI / 2}
        opacity={0.6}
        scale={[0.8, 0.8, 1]}
      />
      <directionalLight
        ref={light}
        castShadow
        intensity={1.5}
        shadow-camera-far={70}
      />
    </mesh>
  );
}

export default Button;
