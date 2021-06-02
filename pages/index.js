import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";

import { useState } from "react";
import { MainScene } from "../components/MainScene";

import styles from "../styles/Home.module.css";
import { useSpring, animated } from "@react-spring/web";
import { Trail } from "../components/Trail";
import Images from "../components/Images";
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

  const imgstyles = useSpring({
    from: { opacity: "0", x: 100 },
    to: {
      opacity: "1",
      x: 0,
    },
    config: {
      duration: 400,
      mass: 1,
      tension: 1000,
      friction: 100,
    },
  });

  return (
    <>
      {start ? (
        <MainScene />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.title}>
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
            {/* <div>
              <animated.div
                style={props}
                className={styles.underline}
              ></animated.div>
            </div> */}
          </div>
          <div className={styles.underlinediv}>
            <animated.div
              style={props}
              className={styles.underline}
            ></animated.div>
          </div>
          <animated.div className={styles.mainphoto1} style={imgstyles}>
            <Image
              src="/images/rio.jpeg"
              alt="prato en el rio"
              width={460}
              height={308}
              layout="intrinsic"
            />
            {/* <Images /> */}
          </animated.div>
          <animated.div className={styles.mainphoto2} style={imgstyles}>
            <Image
              src="/images/reci.jpeg"
              alt="prato en el reci"
              width={460}
              height={308}
              layout="intrinsic"
            />
            {/* <Images /> */}
          </animated.div>
        </div>
      )}
    </>
  );
}
