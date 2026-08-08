
import { ReactNode, useEffect, useState } from 'react'
import useLocar from '../hooks/useLocar';
import * as THREE from 'three';
import type { GeoLineProps } from '../types';


export default function GeoLine({ coordinates, width, children }: GeoLineProps) {


    const { locar } = useLocar();

    const [lineGeom, setLineGeom] = useState<THREE.BufferGeometry | null>(null);

    useEffect(() => {

        setLineGeom(locar.createGeoLine(coordinates, width));

    }, [coordinates])
    return (
        lineGeom === null ? "" :
            <mesh>
                <primitive object={lineGeom}>
                </primitive>
                {children}
            </mesh>
    );
}