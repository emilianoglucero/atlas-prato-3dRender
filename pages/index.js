import React, { useMemo } from "react";
import ReactDOM from "react-dom";

import { useState } from "react";
import { Welcome } from "../components/Welcome";
import { MainScene } from "../components/MainScene";

export default function Home() {
  const [start, setStart] = useState(false);

  return (
    <>
      {start ? (
        <MainScene />
      ) : (
        <>
          <h3>Hace click en comenzar</h3>
          <button onClick={(e) => setStart(true)}>Comenzar</button>
        </>
      )}
    </>
  );
}
