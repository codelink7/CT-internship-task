import type { Asset, SensorReading } from './types';

const BASE_URL = 'http://localhost:8080/api/assets';

export const getAssets = async (): Promise<Asset[]> => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const getAssetById = async (id: string): Promise<Asset> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
};

export const getLatestReading = async (id: string): Promise<SensorReading> => {
    const res = await fetch(`${BASE_URL}/${id}/latest-reading`);
    return res.json();
};