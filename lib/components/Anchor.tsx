
import { useEffect, useState } from 'react'
import useLocar from '../hooks/useLocar';
import type { AnchorProps } from '../types';


export default function Anchor({ latitude, longitude, elevation, children }: AnchorProps) {


    const { locar } = useLocar();

    const [coords, setCoords] = useState<[number, number, number] | null>(null);

    useEffect(() => {

        const coords = locar.lonLatToWorldCoords(longitude, latitude);

        setCoords([coords[0], elevation ?? 0, coords[1]]);
    }, [latitude, longitude, elevation])
    return (
        coords === null ? "" :
            <group position={coords}>
                {children}
            </group>
    );
}