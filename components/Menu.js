import React from "react";

export const Menu = () => {
  return (
    <div onClick={() => set(!zoom)}>
      <ul>
        <li>Televisor</li>
        <li>Zona de accion</li>
        <li>Caja negra</li>
      </ul>
    </div>
  );
};
