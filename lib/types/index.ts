import { ReactNode } from 'react';

import { LocAR, BasicAppOptions } from 'locar'

export type LocARProps = { options?: BasicAppOptions, fakeLon?: number, fakeLat?: number, elevation?: number, children?: ReactNode, onGpsUpdate?: (position: GeolocationPosition, distMoved: number) => void };
export type LocARInfo = { locar: LocAR, cameraFeedDimensions: { landWidth: number, landHeight: number } | null };
export type AnchorProps = { latitude: number, longitude: number, elevation?: number, children?: ReactNode };
export type GeoLineProps = { coordinates: [number, number, number?][], width: number, children?: ReactNode };
