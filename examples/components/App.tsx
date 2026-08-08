
import { Canvas } from '@react-three/fiber';

import { LocAR, Anchor } from 'locar-react';

export default function App() {
    return (
        <Canvas camera={{ fov: 60, near: 0.001, far: 4000 }}>
            <LocAR fakeLon={-0.72} fakeLat={51.05} elevation={1}>
                <Anchor longitude={-0.72} latitude={51.0501}>
                    <mesh>
                        <meshBasicMaterial color={0xff0000} />
                        <boxGeometry args={[10, 10, 10]} />
                    </mesh>
                </Anchor>   
            </LocAR>
        </Canvas>
    );
}
