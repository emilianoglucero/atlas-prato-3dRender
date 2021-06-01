import React, { useEffect, useState } from "react";
import "../styles/globals.css";
export const Welcome = (setStart) => {
  console.log(setStart);
  return (
    <div className="wrapper">
      <h3>Hace click en comenzar</h3>
      <button onClick={(e) => setStart(true)}>Comenzar</button>
    </div>
  );
};
