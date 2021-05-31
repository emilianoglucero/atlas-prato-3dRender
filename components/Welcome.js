import React, { useEffect, useState } from "react";

export const Welcome = (setStart) => {
  console.log(setStart);
  return (
    <>
      <h3>Hace click en comenzar</h3>
      <button onClick={(e) => setStart(true)}>Comenzar</button>
    </>
  );
};
