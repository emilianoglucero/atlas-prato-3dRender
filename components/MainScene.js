import { Box, Html, OrbitControls, Plane, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import GLTFModal from "./GTLFModal";
import { Lights } from "./Lights";
import { a, config, useSpring } from "@react-spring/three";
import { Loader } from "./Loader";

export const MainScene = () => {
  const ref = useRef();

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

  // video setup
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/AtlasPrato-min.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    return vid;
  });
  // Keep in mind videos can only play once the user has interacted with the site ...
  useEffect(() => void video.play(), [video]);

  // tv react spring animation
  const [hovered, setHover] = useState(false);

  const tvanimation = useSpring({
    scale: hovered ? [1.6, 1.6, 1.6] : [1, 1, 1],
    position: hovered ? [1.5, 0, 0] : [0, 0, 0],
    config: config.wobbly,
  });

  // blackbox react spring animation
  const [hoveredBox, setHoverBox] = useState(false);

  const blackbox = useSpring({
    scale: hoveredBox ? [0.6, 0.16, 0.16] : [0.3, 0.08, 0.08],
    position: hoveredBox ? [-1.7, 0.12, 0] : [-1.93, 0.12, 0],
    rotation: [0, 1.5, 0],
    config: config.wobbly,
  });

  // useEffect(() => {
  //   document.body.style.cursor = hovered && "pointer";
  // }, [hovered, hoveredBox]);
  // scale={[0.3, 0.08, 0.08]}
  // rotation={[0, 1.5, 0]}
  // position={[-1.95, 0.12, 0]}

  return (
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

        <Lights />
        <group>
          {/* blue paint wall */}
          <mesh
            ref={ref}
            scale={[1, 0.9, 1]}
            rotation={[0, 1.5, 0]}
            position={[-1.94, 0, 0]}
          >
            <Plane args={[1, 2.3]}>
              <meshStandardMaterial attach="material" color="darkslateblue" />
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
              <meshStandardMaterial attach="material" color="darkslateblue" />
            </Plane>
          </mesh>
        </group>

        {/* title */}
        <mesh
          ref={ref}
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 0, 0]}
          position={[0, 3, 1]}
        >
          <Html
            prepend // Project content behind the canvas (default: false)
            center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
            fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
            distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
            zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
            transform // If true, applies matrix3d transformations (default=false)
            sprite // Renders as sprite, but only in transform mode (default=false)
          >
            <h3>ATLAS PRATO</h3>
          </Html>
        </mesh>

        {/*  main gallery model */}
        <GLTFModal
          scenePath="/jannotta_gallery/scene.gltf"
          position={[0, -1, 0]}
          rotation={[0.002, 0.01, 0]}
          scale={[0.33, 0.33, 0.33]}
        />

        {/* black box */}
        <a.mesh
          ref={ref}
          // scale={[0.3, 0.08, 0.08]}
          // rotation={[0, 1.5, 0]}
          // position={[-1.95, 0.12, 0]}
          {...blackbox}
          onPointerOver={(e) => setHoverBox(true)}
          onPointerOut={(e) => setHoverBox(false)}
        >
          <Box>
            <meshBasicMaterial attach="material" color="black" />
          </Box>
        </a.mesh>

        <a.group
          ref={ref}
          {...tvanimation}
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}
        >
          {/* black television */}
          <mesh
            ref={ref}
            //scale={[2, 2, 2]}
            scale={[2, 2, 2]}
            rotation={[0, 1.5, 0]}
            position={[-1.94, -0.1359, 0]}
          >
            >
            <GLTFModal
              scenePath="/television_wall-mounted/scene.gltf"
              position={[0, 0.15, 0]}
              rotation={[0, 0, 0]}
              scale={[0.4, 0.4, 0.33]}
            />
          </mesh>

          {/* html video */}
          <mesh
            ref={ref}
            scale={[0.75, 0.45, 1]}
            rotation={[0, 1.5, 0]}
            position={[-1.92, 0.43, 0]}
          >
            <planeBufferGeometry args={[1, 1]} />
            <meshBasicMaterial>
              <videoTexture attach="map" args={[video]} />
            </meshBasicMaterial>
          </mesh>
        </a.group>

        {/* girl walking */}
        <a.mesh {...girlwalk}>
          <GLTFModal
            scenePath="/woman_walking/scene.gltf"
            position={[0, -1, 0]}
            rotation={[-1.6, 0, -1.3]}
            scale={[0.001, 0.001, 0.001]}
          />
        </a.mesh>
      </Suspense>
      {/* autoRotate={true} enableZoom={false} Allows us to move the canvas around for different prespectives */}
      <OrbitControls />
    </Canvas>
  );
};
