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

export const createAsset = async (newAsset: Omit<Asset, 'id'>): Promise<Asset> => {

  const response = await fetch('http://localhost:8080/api/assets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAsset),
  });

  if (!response.ok) {
    throw new Error('Failed to create asset');
  }

  return response.json();
};