import { Html, useProgress } from "@react-three/drei";
import React from "react";
import styles from "../styles/Loader.module.css";

export const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html className={styles.loader} center>
      {progress}
    </Html>
  );
};
