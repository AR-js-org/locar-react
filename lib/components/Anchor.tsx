
import { useEffect, useState } from 'react';
import useLocar from '../hooks/useLocar';
import type { AnchorProps } from '../types';


export default function Anchor({ latitude, longitude, elevation, children }: AnchorProps) {
    const { locar } = useLocar();

    const [pos, setPos] = useState<[number, number, number] | null>(null);

    useEffect(() => {
        const [x, z] = locar.lonLatToWorldCoords(longitude, latitude);
        setPos([x, elevation || 0, z]);

    }, [longitude, latitude])

    return ((pos === null ? "" :

        <group position={pos}>
            {children}
        </group>

    ));
}