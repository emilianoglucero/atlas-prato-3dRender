import React, { useEffect, useRef, useState } from "react";
import { a, config, useSpring } from "@react-spring/three";
import GLTFModal from "./GTLFModal";

export const Screen = ({ hoveredScreen }) => {
  const ref = useRef();
  // console.log(hoveredScreen);

  const tvanimation = useSpring({
    scale: hoveredScreen ? [1.6, 1.6, 1.6] : [1, 1, 1],
    position: hoveredScreen ? [1.5, 0, 0] : [0, 0, 0],
    config: config.wobbly,
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

  return (
    <a.group ref={ref} {...tvanimation}>
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
  );
};
