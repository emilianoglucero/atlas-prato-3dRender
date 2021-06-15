import * as THREE from "three";
import {
  Box,
  Html,
  OrbitControls,
  OrthographicCamera,
  Plane,
  Stars,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import GLTFModal from "./GTLFModal";
import { Lights } from "./Lights";
import { a, config, useSpring } from "@react-spring/three";
import { Loader } from "./Loader";
import Button from "./Zoom";
import GLTFModalAnimation from "./GTLFModalAnimation";
import MenuElement from "./MenuElement";
import { Screen } from "./Screen";
import { BlackBox } from "./BlackBox";
import { WalkingZone } from "./WalkingZone";

const MainScene = () => {
  const ref = useRef();

  // blackbox hover animation state
  const [hoveredBox, setHoverBox] = useState(false);
  // tv screen spring hover animation
  const [hoveredScreen, setHoverScreen] = useState(false);
  const [hoveredZone, setHoverZone] = useState(false);
  // gir walk react spring animation
  const girlwalk = useSpring({
    from: { position: [-1, 0, 0] },
    to: { position: [0.76, 0, 0] },
    loop: { reverse: true },
    delay: 3000,
    config: {
      duration: 8000,
      mass: 1,
      tension: 280,
      friction: 120,
    },
  });

  const [zoom, set] = useState(true);

  return (
    <>
      <Canvas
        style={{ width: `100vw`, height: `100vh` }}
        colorManagement
        shadowMap
        camera={{ position: [1, 1.5, 1.5], fov: 60 }}
      >
        <Suspense fallback={<Loader />}>
          {/*star system by drei*/}
          <Stars
            radius={100} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={5000} // Amount of stars (default=5000)
            factor={4} // Size factor (default=4)
            saturation={0} // Saturation 0-1 (default=0)
            fade // Faded dots (default=false)
          />
          {/* <Button /> */}
          <Lights />

          {/*  main gallery model */}
          <GLTFModal
            scenePath="/jannotta_gallery/scene.gltf"
            position={[0, -1, 0]}
            rotation={[0.002, 0.01, 0]}
            scale={[0.33, 0.33, 0.33]}
          />

          <Screen hoveredScreen={hoveredScreen} />
          <BlackBox hoveredBox={hoveredBox} />
          <WalkingZone hoveredZone={hoveredZone} />

          {/* girl walking */}
          <a.mesh {...girlwalk}>
            <GLTFModal
              scenePath="/woman_walking/scene.gltf"
              position={[0, -1, 0]}
              rotation={[-1.6, 0, -1.3]}
              scale={[0.001, 0.001, 0.001]}
            />
          </a.mesh>

          {/* girl walking with animation */}
          {/* <a.mesh {...girlwalk}>
            <GLTFModalAnimation
              scenePath="/mia_walking/scene.gltf"
              position={[0, -1, 0]}
              rotation={[-1.6, -1.2, -1.3]}
              scale={[0.01, 0.01, 0.01]}
            />
          </a.mesh> */}
          <MenuElement
            text={<span>Secciones de la obra</span>}
            color="white"
            position={[-1.6, 1.4, 2.5]}
            scale={[0.15, 0.15, 0.15]}
          />
          <mesh
            onPointerOver={(e) => setHoverScreen(true)}
            onPointerOut={(e) => setHoverScreen(false)}
          >
            <MenuElement
              text={<span>Pantalla</span>}
              color="lightblue"
              position={[-1.6, 0.8, 2.5]}
              scale={[0.12, 0.12, 0.12]}
            />
          </mesh>
          <mesh
            onPointerOver={(e) => setHoverBox(true)}
            onPointerOut={(e) => setHoverBox(false)}
          >
            <MenuElement
              text={<span>Caja</span>}
              color="lightblue"
              position={[-1.6, 0.2, 2.5]}
              scale={[0.12, 0.12, 0.12]}
            />
          </mesh>
          <mesh
            onPointerOver={(e) => setHoverZone(true)}
            onPointerOut={(e) => setHoverZone(false)}
          >
            <MenuElement
              text={<span>Zona delimitada</span>}
              color="lightblue"
              position={[-1.6, -0.4, 2.5]}
              scale={[0.12, 0.12, 0.12]}
            />
          </mesh>
        </Suspense>
        {/* autoRotate={true} enableZoom={false} Allows us to move the canvas around for different prespectives */}
        <OrthographicCamera />
        {/* <OrbitControls /> */}
      </Canvas>
    </>
  );
};

export default MainScene;
