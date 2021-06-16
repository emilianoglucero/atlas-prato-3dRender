import { Html, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

function WalkingZoneMenuElement({ text, color, args, ...props }) {
  const vec = new THREE.Vector3();
  const [hovered, setHover] = useState(false);
  const [zoom, set] = useState(false);
  console.log(zoom);

  useFrame((state) => {
    const step = 0.1;
    state.camera.fov = THREE.MathUtils.lerp(
      state.camera.fov,
      zoom ? -50 : 50,
      step
    );
    state.camera.position.lerp(
      vec.set(zoom ? 25 : 2.2, zoom ? 8 : 1, zoom ? 3 : 4),
      step
    );
    //state.camera.rotation.x += 0.01;
    state.camera.lookAt(zoom ? -2 : -3, zoom ? -1 : 0, zoom ? -1 : -2);
    state.camera.updateProjectionMatrix();
    // light.current.position.lerp(
    //   vec.set(zoom ? 4 : 0, zoom ? 3 : 8, zoom ? 3 : 5),
    //   step
    // );
  });
  return (
    <>
      <mesh>
        <Plane
          {...props}
          args={[2, 3.7]}
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}
          onClick={() => set(!zoom)}
          //   scale={[0.15, 0.15, 0.15]}
          rotation={[0, 1, 0]}
        >
          {/* <boxGeometry args={args} /> */}
          <meshStandardMaterial color={hovered ? "white" : color} />
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
        </Plane>
      </mesh>

      {zoom && (
        <mesh
          onClick={() => {
            set(!zoom);
            setHover(!hovered);
          }}
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}
        >
          <Plane
            color="darkslateblue"
            args={[1.2, 2.7]}
            position={[-0.6, 0.4, -1.8]}
            scale={[0.32, 0.32, 0.32]}
            //   scale={[0.15, 0.15, 0.15]}
            rotation={[0, 1, 0]}
          >
            {/* <boxGeometry args={args} /> */}
            <meshStandardMaterial color={hovered ? color : "white"} />
            <Html
              // distanceFactor={50}
              transform={true}
              style={{
                transition: "all 0.2s",
                fontSize: "28px",
              }}
              as="div"
              position={[0, 0, 0]}
              className="label"
              center
            >
              Volver
            </Html>
          </Plane>
        </mesh>
      )}
    </>
  );
}

export default WalkingZoneMenuElement;
