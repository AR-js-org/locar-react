
import { useEffect } from 'react';
import { App } from 'locar';
import * as React from 'react';
import { useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LocarContext = React.createContext({});
export { LocarContext };

import type { LocARInfo, LocARProps } from '../types';
export default function LocAR({ options, fakeLon, fakeLat, elevation, onGpsUpdate, children }: LocARProps) {

    const [locar, setLocar] = useState<LocARInfo | null>(null);

    const { camera, gl, scene } = useThree();

    useEffect(() => {
        setupLocar();

        async function setupLocar() {

            const app = new App({ ...(options || {}), threeObjects: { camera: camera as THREE.PerspectiveCamera, scene, renderer: gl } });
            const tmpLocarObject = await app.start();

            tmpLocarObject.on("gpsupdate", (position: GeolocationPosition) => {
                // Do not provide locar to children until we have an initial position
                setLocar({ locar: tmpLocarObject, cameraFeedDimensions: app.cameraFeedDimensions });
                onGpsUpdate?.(position);
            });

            if (elevation !== undefined) {
                tmpLocarObject.setElevation(elevation);
            }
            if (fakeLat !== undefined && fakeLon !== undefined) {
                tmpLocarObject.fakeGps(fakeLon, fakeLat);
            } else {
                tmpLocarObject.startGps();
            }

        }
    }, []);

    // Do not render children until locar is ready
    return (locar === null ? "" :
        <LocarContext.Provider value={locar}>
            {children}
        </LocarContext.Provider>
    );
}
