import { useFrame } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import BlackBoxMenuElement from "./BlackBoxMenuElement";
import { useMenuDisplay, useMenuUpdateDisplay, useStore } from "./MenuContext";
import MenuElement from "./MenuElement";
import ScreenMenuElement from "./ScreenMenuElement";
import WalkingZoneMenuElement from "./WalkingZoneMenuElement";
import * as THREE from "three";

export const Menu = ({ setHoverBox, setHoverScreen, setHoverZone }) => {
  const menuDisplay = useStore((state) => state.menuDisplay);
  const toggleMenuElementDisplay = useStore(
    (state) => state.toggleMenuElementDisplay
  );

  return (
    <>
      <MenuElement
        text={menuDisplay && <span>Secciones de la obra</span>}
        color="white"
        position={[-1.6, 1.4, 2.5]}
        scale={[0.15, 0.15, 0.15]}
      />
      <mesh
        onPointerOver={(e) => setHoverScreen(true)}
        onPointerOut={(e) => setHoverScreen(false)}
      >
        <ScreenMenuElement
          text={menuDisplay && <span>Pantalla</span>}
          color="lightblue"
          position={[-1.6, 0.8, 2.5]}
          scale={[0.12, 0.12, 0.12]}
          setHoverScreen={setHoverScreen}
        />
      </mesh>
      <mesh
        onPointerOver={(e) => setHoverBox(true)}
        onPointerOut={(e) => setHoverBox(false)}
      >
        <BlackBoxMenuElement
          text={menuDisplay && <span>Caja</span>}
          color="lightblue"
          position={[-1.6, 0.2, 2.5]}
          scale={[0.12, 0.12, 0.12]}
          setHoverBox={setHoverBox}
        />
      </mesh>
      <mesh
        onPointerOver={(e) => setHoverZone(true)}
        onPointerOut={(e) => setHoverZone(false)}
      >
        <WalkingZoneMenuElement
          text={menuDisplay && <span>Zona delimitada</span>}
          color="lightblue"
          position={[-1.6, -0.4, 2.5]}
          scale={[0.12, 0.12, 0.12]}
          setHoverZone={setHoverZone}
        />
      </mesh>
    </>
  );
};
