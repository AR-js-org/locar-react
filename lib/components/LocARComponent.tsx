
import { useEffect } from 'react';
import { App } from 'locar';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LocarContext = React.createContext({});
export { LocarContext };

import type { LocARInfo, LocARProps } from '../types';
export default function LocARComponent({ options, fakeLon, fakeLat, elevation, onGpsUpdate, children }: LocARProps) {
    const [locar, setLocar] = useState<LocARInfo | null>(null);
    const app = useRef<App | null>(null);

    const { camera, gl, scene } = useThree();

    useFrame(() => {
        app.current?.deviceOrientationControls?.update();
    });

    useEffect(() => {
        setupLocar();

        async function setupLocar() {

            app.current = new App({ ...(options || {}), threeObjects: { camera: camera as THREE.PerspectiveCamera, scene, renderer: gl } });
            const tmpLocarObject = await app.current.start();

            tmpLocarObject.on("gpsupdate", (info: { position: GeolocationPosition, distMoved: number }) => {
                // Do not provide locar to children until we have an initial position
                setLocar({ locar: tmpLocarObject, cameraFeedDimensions: app.current!.cameraFeedDimensions });
                onGpsUpdate?.(info.position, info.distMoved);
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
