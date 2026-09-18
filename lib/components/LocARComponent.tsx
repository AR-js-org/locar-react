import { LocARProps, LocARInfo } from "../types";
import { useState, useEffect, useRef, createContext } from 'react';
import { App, GpsReceivedEvent } from 'locar';
import { useThree, useFrame, Size } from '@react-three/fiber';
import { PerspectiveCamera } from "three";

const LocarContext = createContext({});
export { LocarContext };


export default function LocARComponent({ options, fakeLon, fakeLat, elevation, onGpsUpdate, children }: LocARProps) {

    const [locar, setLocar] = useState<LocARInfo | null>(null);
    const { camera, gl, scene, size } = useThree();

    const app = useRef<App | null>(null);
    const lastIsLand = useRef<boolean | null>(null);
    const cameraFeedDimensions = useRef<{ landWidth: number, landHeight: number } | null>(null);

    const curSize = useRef(size);
    const lastSize = useRef({ width: 0, height: 0 });
    useEffect(() => {
        curSize.current = size;
    }, [size]);

    useEffect(() => {
        createLocar();
    }, []);

    useFrame(() => {
        app.current?.deviceOrientationControls?.update();
       
        if (size.width != lastSize.current.width || size.height != lastSize.current.height) {
            console.log("LocARComponent: useFrame(): CHANGED ORIENTATION");
            lastSize.current = { width: size.width, height: size.height };
            (camera as PerspectiveCamera).aspect = size.width / size.height;
            camera.updateProjectionMatrix();
            app.current?.syncFovWithWebcam(size.width / size.height);
        }
    });

    async function createLocar() {
        app.current = new App({
            ...options, threeObjects: { camera: camera as PerspectiveCamera, renderer: gl, scene },
            dimensionsProvider: () => curSize.current ?? { width: 0, height: 0 }
        });
        app.current.on("webcamstarted", ev => {
            cameraFeedDimensions.current = { landWidth: ev.landVideoWidth, landHeight: ev.landVideoHeight };
        });

        const tmpLocar = await app.current.start();
        tmpLocar.on("gpsupdate", (ev: GpsReceivedEvent) => {
            // Do not give locar a value until a position and camera feed dimensions have been obtained
            if (cameraFeedDimensions.current !== null) {
                setLocar({
                    locar: tmpLocar,
                    cameraFeedDimensions: cameraFeedDimensions.current
                });
            }

            onGpsUpdate?.(ev.position, ev.distMoved);
        });

        if (elevation !== undefined) {
            tmpLocar.setElevation(elevation);
        }
        if (fakeLat !== undefined && fakeLon !== undefined) {
            tmpLocar.fakeGps(fakeLon, fakeLat);
        } else {
            tmpLocar.startGps();
        }

    }

    return locar === null ? "" : (
        <LocarContext.Provider value={locar}>
            {children}
        </LocarContext.Provider>
    );
}