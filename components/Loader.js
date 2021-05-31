import { Html, useProgress } from "@react-three/drei";
import React from "react";

export const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} %</Html>;
};
