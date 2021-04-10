const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
  "@react-three/fiber",
]);

module.exports = withTM();

// const withImages = require("next-images");

// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /react-spring/,
//       sideEffects: true,
//     });
//     return config;
//   },
// };
