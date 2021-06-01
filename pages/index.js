import React, { useMemo } from "react";
import ReactDOM from "react-dom";

import { useState } from "react";
import { MainScene } from "../components/MainScene";

import styles from "../styles/Home.module.css";
import { useSpring, animated } from "@react-spring/web";
import { Trail } from "../components/Trail";
export default function Home() {
  const [start, setStart] = useState(false);
  const [toggle, setToggle] = useState(false);
  const props = useSpring({
    from: { opacity: "0" },
    to: {
      opacity: toggle ? "1" : "0",
      width: toggle ? "100%" : "0%",
      backgroundColor: toggle ? "blue" : "hsl(252,50%,61%)",
    },
    config: { duration: 400 },
  });

  return (
    <>
      {start ? (
        <MainScene />
      ) : (
        <div className={styles.wrapper}>
          <div>
            <Trail style={styles.trailtitle}>
              <span>A</span>
              <span>t</span>
              <span>l</span>
              <span>a</span>
              <span>s &nbsp;</span>

              <span>P</span>
              <span>r</span>
              <span>a</span>
              <span>t</span>
              <span>o</span>
            </Trail>
          </div>

          {/* <p className={styles.title}>Atlas Prato</p> */}
          <div
            className={styles.button}
            onMouseEnter={(e) => setToggle(true)}
            onMouseLeave={(e) => setToggle(false)}
            onClick={(e) => setStart(true)}
          >
            <Trail style={styles.trailbutton}>
              <span>C</span>
              <span>o</span>
              <span>m</span>
              <span>e</span>
              <span>n</span>
              <span>z</span>
              <span>a</span>
              <span>r</span>
            </Trail>
            {/* <p>Comenzar</p> */}
            <div>
              <animated.div
                style={props}
                className={styles.underline}
              ></animated.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
