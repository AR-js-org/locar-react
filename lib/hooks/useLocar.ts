
import { useContext } from 'react';
import { LocarContext } from '../components/LocARComponent';
import type { LocARInfo } from '../types';

export default function useLocar() : LocARInfo {
    return useContext(LocarContext) as LocARInfo;
}