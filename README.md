# locar-react

A lightweight [react-three-fiber](https://r3f.docs.pmnd.rs)-based React wrapper for [LocAR.js](https://github.com/AR-js-org/locar.js), which aims to bring React Native support to LocAR.js in the (hopefully) near future.

It's also used as a "simplest possible React" test platform to investigate and diagnose cases where [RDK](https://github.com/omnidotdev/rdk) behaves differently to plain LocAR.js - to investigate whether the issue is due to issues within RDK or due to the use of a React wrapper in general.

See the `examples` directory for examples.

Currently not published to npm, and may not be any time soon. Please `npm run build` to generate a tarball and use that as your dependency.

If you wish to work with LocAR and React solely on the web platform, [RDK](https://github.com/omnidotdev/rdk) is recommended.
