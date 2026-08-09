
import { Canvas } from '@react-three/fiber';

import { LocAR, Anchor, GeoLine } from 'locar-react';

export default function App() {
    return (
        <Canvas camera={{ fov: 60, near: 0.001, far: 4000 }}>
            <LocAR fakeLon={-0.72} fakeLat={51.05} elevation={5}>
                <Anchor longitude={-0.7205} latitude={51.0505}>
                    <mesh>
                        <meshBasicMaterial color={0xff0000} />
                        <boxGeometry args={[10, 10, 10]} />
                    </mesh>
                </Anchor>
                <Anchor longitude={-0.7195} latitude={51.0505}>
                    <mesh>
                        <meshBasicMaterial color={0xffff00} />
                        <boxGeometry args={[10, 10, 10]} />
                    </mesh>
                </Anchor>
                <GeoLine coordinates={[
                    [-0.72, 51.05, 0],
                    [-0.72, 51.0501, 2],
                    [-0.72, 51.0502, 0],
                    [-0.7201, 51.0503, 0],
                    [-0.7199, 51.0505, 0],
                    [-0.7199, 51.0507, 1],
                    [-0.7201, 51.051, 5],
                    [-0.72, 51.0515, 15],
                    [-0.7199, 51.0517, 20],
                    [0.7199, 51.0518, 22],
                    [-0.72, 51.052, 23]]} width={2}>
                    <meshBasicMaterial color={0x00ff00} />
                </GeoLine>
            </LocAR>
        </Canvas>
    );
}
