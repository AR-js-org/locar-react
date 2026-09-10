import { LocARProps, LocARInfo } from "../types";
import { useState, useEffect, useRef, createContext } from 'react';
import { App, GpsReceivedEvent } from 'locar';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from "three";

const LocarContext = createContext({});
export { LocarContext };


export default function LocARComponent({ options, fakeLon, fakeLat, elevation, onGpsUpdate, children }: LocARProps) {

    const [locar, setLocar] = useState<LocARInfo | null>(null);
    const { camera, gl, scene } = useThree();

    const app = useRef<App | null>(null);
    const lastIsLand = useRef<boolean | null>(null);

    useEffect(() => {
        createLocar();
    }, [options, fakeLon, fakeLat, elevation, onGpsUpdate]);

    useFrame(() => {
        app.current?.deviceOrientationControls?.update();
        const isLand = window.innerWidth > window.innerHeight;
        if (isLand !== lastIsLand.current) {
            console.log("LocARComponent: useFrame(): CHANGED ORIENTATION");
            lastIsLand.current = isLand;
            app.current?.syncFovWithWebcam();
        }
    });

    async function createLocar() {
        app.current = new App({ ...options, threeObjects: { camera: camera as PerspectiveCamera, renderer: gl, scene } });
        const tmpLocar = await app.current.start();
        tmpLocar.on("gpsupdate", (ev: GpsReceivedEvent) => {
            // Do not give locar a value until a position and camera feed dimensions have been obtained

            setLocar({
                locar: tmpLocar,
                cameraFeedDimensions: app.current!.cameraFeedDimensions
            });

            onGpsUpdate?.(ev.position, ev.distMoved);
        });

        if (elevation !== undefined) {
            tmpLocar.setElevation(elevation);
        }
        if (fakeLat !== undefined && fakeLon !== undefined) {
            tmpLocar.fakeGps(fakeLon, fakeLat);
        }

    }

    return locar === null ? "" : (
        <LocarContext.Provider value={locar}>
            {children}
        </LocarContext.Provider>
    );
}