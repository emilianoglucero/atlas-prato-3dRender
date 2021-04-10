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
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import GLTFModal from "../components/GTLFModal";
// import dynamic from "next/dynamic";
// const Galery = dynamic(
//   () => import("../components/GLTFModal"),
//   { ssr: false }
// );

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % modelo cargado</Html>;
}

export default function Home() {
  const ref = useRef();
  return (
    <>
      <Canvas
        style={{ width: `100vw`, height: `100vh` }}
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <Suspense fallback={<Loader />}>
          {/*sistema de estrellas by drei*/}
          <Stars
            radius={100} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={5000} // Amount of stars (default=5000)
            factor={4} // Size factor (default=4)
            saturation={0} // Saturation 0-1 (default=0)
            fade // Faded dots (default=false)
          />
          <mesh ref={ref} scale={[1, 1, 1]} position={[2, -2, -4]}>
            <Plane args={[1, 2.5]}>
              <meshStandardMaterial attach="material" color="darkslateblue" />
              {/* <meshBasicMaterial attach="material" color="darkslateblue" /> */}
            </Plane>
          </mesh>
          {/* This mesh is the plane (The floor) */}

          {/* <mesh
            visible // object gets render if true
            userData={{ test: "hello" }} // An object that can be used to store custom data about the Object3d
            position={[0, 0, 0]} // The position on the canvas of the object [x,y,x]
            rotation={[0, 0, 0]} // The rotation of the object
            castShadow // Sets whether or not the object cats a shadow */}

          {/* A spherical shape*/}
          {/* <sphereGeometry attach="geometry" args={[1, 16, 200]} /> */}
          {/* A standard mesh material*/}
          {/* <meshStandardMaterial
              attach="material" // How the element should attach itself to its parent
              color="#7222D3" // The color of the material
              transparent // Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
              roughness={0.1} // The roughness of the material - Defaults to 1
              metalness={0.1} // The metalness of the material - Defaults to 0
            /> */}
          {/* </mesh> */}
          {/*An ambient light that creates a soft light against the object */}
          <ambientLight intensity={0.5} />
          {/*An directional light which aims form the given position */}
          <directionalLight position={[10, 10, 5]} intensity={1} />
          {/*An point light, basically the same as directional. This one points from under */}
          <pointLight position={[0, -10, 5]} intensity={1} />

          {/* We can use the drei Sphere which has a simple API. This sphere has a wobble material attached to it */}
          {/* <Sphere visible position={[-3, 0, 0]} args={[1, 16, 200]}>
            <MeshWobbleMaterial
              attach="material"
              color="#EB1E99"
              factor={1} // Strength, 0 disables the effect (default=1)
              speed={2} // Speed (default=1)
              roughness={0}
            />
          </Sphere> */}

          {/* This sphere has a distort material attached to it */}
          {/* <Sphere visible position={[3, 0, 0]} args={[1, 16, 200]}>
            <MeshDistortMaterial
              color="#00A38D"
              attach="material"
              distort={0.5} // Strength, 0 disables the effect (default=1)
              speed={2} // Speed (default=1)
              roughness={0}
            />
          </Sphere> */}

          <GLTFModal
            scenePath="/jannotta_gallery/scene.gltf"
            position={[0, -1, 0]}
            rotation={[0.002, 0.01, 0]}
            scale={[0.33, 0.33, 0.33]}
          />
          <GLTFModal
            scenePath="/television_wall-mounted/scene.gltf"
            position={[0, 0, 0]}
            rotation={[0.002, 0.01, 0]}
            scale={[0.33, 0.33, 0.33]}
          />
        </Suspense>
        {/* Allows us to move the canvas around for different prespectives */}
        <OrbitControls />
      </Canvas>
    </>
  );
}
