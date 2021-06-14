import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Head from "next/head";

import { useState } from "react";

import styles from "../styles/Home.module.css";
import { useSpring, animated, useSpringRef, useChain } from "@react-spring/web";
import { Trail } from "../components/Trail";
import Images from "../components/Images";
import MainScene from "../components/MainScene";
export default function Home() {
  const [start, setStart] = useState(false);
  const [toggle, setToggle] = useState(false);
  const underlineanimation = useSpring({
    from: { opacity: "0" },
    to: {
      opacity: toggle ? "1" : "0",
      width: toggle ? "100%" : "0%",
      backgroundColor: toggle ? "blue" : "hsl(252,50%,61%)",
    },
    config: { duration: 400 },
  });

  const imganimation = useSpring({
    from: { opacity: "0", x: 250 },
    to: {
      opacity: "1",
      x: 0,
    },
    config: {
      duration: 850,
      mass: 1,
      tension: 1000,
      friction: 100,
    },
  });

  // useChain([imgRef, trailRef])
  return (
    <>
      <Head>
        <title>Atlas Prato</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="preload"
          href="/fonts/@font-face/c0de8fb6038e76e28f87f58c819bbda8.eot"
          as="font"
          crossOrigin=""
        />
      </Head>
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
              style={underlineanimation}
              className={styles.underline}
            ></animated.div>
          </div>
          <animated.div className={styles.mainphoto1} style={imganimation}>
            <Image
              src="/images/rio.jpeg"
              alt="prato en el rio"
              width={460}
              height={308}
              layout="intrinsic"
            />
            {/* <Images /> */}
          </animated.div>
          <animated.div className={styles.mainphoto2} style={imganimation}>
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
