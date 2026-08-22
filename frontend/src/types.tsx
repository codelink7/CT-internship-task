export interface Asset {
    id: number;
    name: string;
    type: string;
    status: 'RUNNING' | 'STOPPED' | 'ALARM';
}

export interface SensorReading {
    id: number;
    assetId: number;
    temperature: number;
    pressure: number;
    timestamp: string;
}