import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import {
  MeshWobbleMaterial,
  MeshDistortMaterial,
  Sphere,
  Html,
  useProgress,
  Stars,
  OrbitControls,
  Plane,
  MeshL,
  Box,
  useTexture,
} from "@react-three/drei";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { Suspense, useRef, useState } from "react";
import { PlaneBufferGeometry, VideoTexture } from "three";
import { a, useSpring, useTrail } from "@react-spring/three";
import GLTFModal from "../components/GTLFModal";
import { Lights } from "../components/Lights";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} %</Html>;
}

export default function Home() {
  const ref = useRef();
  const [video, setVideo] = useState();

  // TO DO: check why video and react spring are not compatible

  // React.useEffect(() => {
  //   setVideo(() => {
  //     const vid = document.createElement("video");
  //     vid.src = "/AtlasPrato.mp4";
  //     vid.crossOrigin = "Anonymous";
  //     vid.loop = true;
  //     vid.play();
  //     return vid;
  //   });
  // }, []);

  const props = useSpring({
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

          {/* html video */}
          {/* <mesh
            ref={ref}
            scale={[0.75, 0.45, 1]}
            rotation={[0, 1.5, 0]}
            position={[-1.92, 0.43, 0]}
          >
            <planeBufferGeometry args={[1, 1]} />
            <meshBasicMaterial>
              {/* <videoTexture attach="map" args={[video]} /> 
            </meshBasicMaterial>
          </mesh> */}

          {/*  main gallery model */}
          <GLTFModal
            scenePath="/jannotta_gallery/scene.gltf"
            position={[0, -1, 0]}
            rotation={[0.002, 0.01, 0]}
            scale={[0.33, 0.33, 0.33]}
          />

          {/* black box */}
          <mesh
            ref={ref}
            scale={[0.3, 0.08, 0.08]}
            rotation={[0, 1.5, 0]}
            position={[-1.95, 0.12, 0]}
          >
            <Box>
              <meshBasicMaterial attach="material" color="black" />
            </Box>
          </mesh>

          {/* black television */}
          <mesh
            ref={ref}
            scale={[2, 2, 2]}
            rotation={[0, 1.5, 0]}
            position={[-1.94, -0.1359, 0]}
          >
            <GLTFModal
              scenePath="/television_wall-mounted/scene.gltf"
              position={[0, 0.15, 0]}
              rotation={[0, 0, 0]}
              scale={[0.4, 0.4, 0.33]}
            />
          </mesh>

          {/* girl walking */}
          <a.mesh {...props}>
            <GLTFModal
              scenePath="/woman_walking/scene.gltf"
              position={[0, -1, 0]}
              rotation={[-1.6, 0, -1.3]}
              scale={[0.001, 0.001, 0.001]}
            />
          </a.mesh>
        </Suspense>
        {/* Allows us to move the canvas around for different prespectives */}
        <OrbitControls autoRotate={true} enableZoom={false} />
      </Canvas>
    </>
  );
}
