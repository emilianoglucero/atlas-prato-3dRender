import React from "react";
import ReactDOM from "react-dom";
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
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { PlaneBufferGeometry, VideoTexture } from "three";
import GLTFModal from "../components/GTLFModal";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import GLTFModalPhysics from "../components/GLTFModalPhysics";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % modelo cargado</Html>;
}

const Borders = () => {
  // const [ref, api] = usePlane(() => ({ mass: 1 }));
  return (
    <group>
      <Plane
        name="Bottom"
        position={[0, -4, 0]}
        scale={[30, 30, 30]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

export default function Home() {
  const ref = useRef();
  const [video, setVideo] = useState();
  React.useEffect(() => {
    setVideo(() => {
      const vid = document.createElement("video");
      vid.src = "/AtlasPrato.mp4";
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.play();
      return vid;
    });
  }, []);

  // const [refGirl] = useSphere(() => ({
  //   mass: 1,
  //   args: 0.5,
  //   position: [0, 5, 0],
  // }));

  return (
    <>
      <Canvas
        style={{ width: `100vw`, height: `100vh` }}
        colorManagement
        shadowMap
        camera={{ position: [1, 1.5, 1.5], fov: 60 }}
      >
        <Suspense fallback={<Loader />}>
          <Physics
            // gravity={[0, -50, 0]}
            defaultContactMaterial={{ restitution: 0.5 }}
          >
            {/*sistema de estrellas by drei*/}
            <Stars
              radius={100} // Radius of the inner sphere (default=100)
              depth={50} // Depth of area where stars should fit (default=50)
              count={5000} // Amount of stars (default=5000)
              factor={4} // Size factor (default=4)
              saturation={0} // Saturation 0-1 (default=0)
              fade // Faded dots (default=false)
            />
            {/* A light to help illumnate the spinning boxes */}
            <pointLight position={[1, 1.3, 1]} intensity={0.5} />
            <pointLight position={[0, 0, 0]} intensity={0.5} />
            {/*An ambient light that creates a soft light against the object */}
            <ambientLight intensity={0.5} />
            {/*An directional light which aims form the given position */}
            <directionalLight position={[10, 10, 5]} intensity={1} />
            {/*An point light, basically the same as directional. This one points from under */}
            <pointLight position={[0, -10, 5]} intensity={1} />
            {/* We can use the drei Sphere which has a simple API. This sphere has a wobble material attached to it */}
            <group>
              {/* blue wall */}
              <Borders />
              <mesh
                ref={ref}
                scale={[1, 0.9, 1]}
                rotation={[0, 1.5, 0]}
                position={[-1.94, 0, 0]}
              >
                <Plane args={[1, 2.3]}>
                  <meshStandardMaterial
                    attach="material"
                    color="darkslateblue"
                  />
                </Plane>
              </mesh>
              {/* blue floor */}
              <mesh
                ref={ref}
                scale={[1, 1.6, 1]}
                rotation={[11, 0, 1.5]}
                position={[-0.8, -0.99, 0.08]}
              >
                <Plane args={[1, 2.3]}>
                  <meshStandardMaterial
                    attach="material"
                    color="darkslateblue"
                  />
                </Plane>
              </mesh>
              {/* blue wall */}
              <mesh
                ref={ref}
                scale={[1, 0.9, 1]}
                rotation={[0, 1.5, 0]}
                position={[-1.94, 0, 0]}
              >
                <Plane args={[1, 2.3]}>
                  <meshStandardMaterial
                    attach="material"
                    color="darkslateblue"
                  />
                </Plane>
              </mesh>

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
              <GLTFModal
                scenePath="/jannotta_gallery/scene.gltf"
                position={[0, -1, 0]}
                rotation={[0.002, 0.01, 0]}
                scale={[0.33, 0.33, 0.33]}
              />
              <mesh
                ref={ref}
                scale={[2, 2, 2]}
                rotation={[0, 1.5, 0]}
                position={[-1.94, -0.1359, 0]}
              >
                <GLTFModal
                  scenePath="/television_wall-mounted/scene.gltf"
                  position={[0, 0.15, 0]}
                  rotation={[0, 1.5, 0]}
                  scale={[0.4, 0.4, 0.33]}
                />
              </mesh>

              <mesh
                ref={ref}
                scale={[2.5, 2.9, 2.3]}
                rotation={[0, 4.5, 0]}
                position={[0, -1, 0.14]}
              >
                <GLTFModalPhysics
                  scenePath="/low_poly_girl/scene.gltf"
                  position={[0, 0, 0]}
                  scale={[0.33, 0.33, 0.33]}
                  // rotation={[0.01, 0.01, 0.1]}
                />
              </mesh>
            </group>
          </Physics>
        </Suspense>
        {/* autoRotate={true} enableZoom={false}Allows us to move the canvas around for different prespectives */}
        <OrbitControls />
      </Canvas>
    </>
  );
}
