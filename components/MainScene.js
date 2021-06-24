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
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import BlackBoxMenuElement from "./BlackBoxMenuElement";
import WalkingZoneMenuElement from "./WalkingZoneMenuElement";
import ScreenMenuElement from "./ScreenMenuElement";
import { Menu } from "./Menu";

const MainScene = () => {
  const value = true;
  const ref = useRef();

  // blackbox react spring hover animation
  const [hoveredBox, setHoverBox] = useState(false);
  // tv screen react spring hover animation
  const [hoveredScreen, setHoverScreen] = useState(false);
  // walking zone react spring hover animation
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

  return (
    <>
      <Canvas
        style={{ width: `100vw`, height: `100vh` }}
        colorManagement
        shadowMap
        camera={{ position: [1, 1.5, 1.5], fov: 60 }}
      >
        {/* <ContextBridge> */}
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
          {value && (
            <Menu
              setHoverBox={setHoverBox}
              setHoverScreen={setHoverScreen}
              setHoverZone={setHoverZone}
            />
          )}
        </Suspense>
        {/* autoRotate={true} enableZoom={false} Allows us to move the canvas around for different prespectives */}
        <OrthographicCamera />
        {/* <OrbitControls /> */}
        {/* </ContextBridge> */}
      </Canvas>
    </>
  );
};

export default MainScene;
