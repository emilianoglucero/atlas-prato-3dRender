import React from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

/**
 * A basic gltf modal renderer component.
 * @param {String} scenePath - The path to the scene file. Should be kept in the public folder
 * @param {Array} position - The position on the canvas the model should take
 * @param {Array} rotation - Optional rotation of the model. If provided [x, y, z] values are mapped to the useFrame hook which will rotate the model in the given direction(s)
 */
const GLTFModalAnimation = ({ scenePath, position, scale, rotation }) => {
  const { scene, nodes, materials, animations } = useGLTF(scenePath, true);
  const { ref, mixer, names, actions, clips } = useAnimations(animations);
  console.log(actions);
  console.log(ref);
  console.log(mixer);
  console.log(names);
  console.log(actions[0]);
  console.log(clips);
  React.useEffect(() => {
    actions["mixamo.com"].play(), [];
    setTimeout(() => {
      actions["mixamo.com"].fadeOut(0.5);
    }, 4000);
  });
  //console.log(gltf);
  const mesh = React.useRef();
  // useFrame(() =>
  //   rotation
  //     ? ((mesh.current.rotation.x += rotation[0]),
  //       (mesh.current.rotation.y += rotation[1]),
  //       (mesh.current.rotation.z += rotation[2]))
  //     : null
  // );
  return (
    <mesh
      castShadow
      ref={ref}
      // ref={mesh}
      scale={scale}
      position={position}
      rotation={rotation}
    >
      <primitive object={scene} dispose={null} />
    </mesh>
  );
};
export default GLTFModalAnimation;
