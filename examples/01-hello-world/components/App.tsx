
import { Canvas } from '@react-three/fiber';

import { LocARComponent, Anchor } from 'locar-react';

export default function App() {
    return (
        <Canvas camera={{ near: 0.001, far: 4000 }} dpr={1}>
            <LocARComponent fakeLon={-0.72} fakeLat={51.05} elevation={1} hFov={80}>
                <Anchor longitude={-0.72} latitude={51.0501}>
                    <mesh>
                        <meshBasicMaterial color={0xff0000} />
                        <boxGeometry args={[2, 2, 2]} />
                    </mesh>
                </Anchor>   
            </LocARComponent>
        </Canvas>
    );
}
