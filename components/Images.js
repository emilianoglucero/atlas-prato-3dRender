import { animated, config, useTransition } from "@react-spring/web";
import Image from "next/image";
import { useState } from "react";

function Images() {
  const [toggle, set] = useState(false);
  const transitions = useTransition(toggle, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: 800,
    width: "0%",
    config: config.slow,
    onRest: () => set(!toggle),
  });
  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        style={{
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}
      >
        <Image
          src="/images/reci.jpeg"
          alt="prato en el reci"
          width={460}
          height={308}
          layout="intrinsic"
        />
      </animated.div>
    ) : (
      <animated.div
        style={{
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}
      >
        <Image
          src="/images/rio.jpeg"
          alt="prato en el rio"
          width={460}
          height={308}
          layout="intrinsic"
        />
      </animated.div>
    )
  );
}

export default Images;
