import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
/**
 * A basic gltf modal renderer component.
 * @param {String} scenePath - The path to the scene file. Should be kept in the public folder
 * @param {Array} position - The position on the canvas the model should take
 * @param {Array} rotation - Optional rotation of the model. If provided [x, y, z] values are mapped to the useFrame hook which will rotate the model in the given direction(s)
 */
const GLTFModal = ({ scenePath, position, scale }) => {
  const gltf = useGLTF(scenePath, true);
  const mesh = React.useRef();
  // useFrame(() =>
  //   rotation
  //     ? ((mesh.current.rotation.x += rotation[0]),
  //       (mesh.current.rotation.y += rotation[1]),
  //       (mesh.current.rotation.z += rotation[2]))
  //     : null
  // );
  return (
    <mesh castShadow ref={mesh} scale={scale} position={position}>
      <primitive object={gltf.scene} dispose={null} />
    </mesh>
  );
};
export default GLTFModal;
