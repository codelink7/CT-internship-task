import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAssetById, getLatestReading } from '../apis';
import type { Asset, SensorReading } from '../types';

export default function AssetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [reading, setReading] = useState<SensorReading | null>(null);

  useEffect(() => {
    if (!id) return;
    
    getAssetById(id).then(setAsset);
    getLatestReading(id).then(setReading);

    const interval = setInterval(() => {
      getAssetById(id).then(setAsset);
      getLatestReading(id).then(setReading);
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  if (!asset) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>← Back to Dashboard</Link>
      <h2>{asset.name} Details</h2>
      <p>Type: {asset.type}</p>
      <p>Current Status: <strong>{asset.status}</strong></p>
      
      <div style={{ background: '#f0f4f8', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>Live Sensor Data</h3>
        {reading ? (
          <>
            <p>Temperature: {reading.temperature.toFixed(2)} °C</p>
            <p>Pressure: {reading.pressure.toFixed(2)} bar</p>
            <p>Last Updated: {new Date(reading.timestamp).toLocaleTimeString()}</p>
          </>
        ) : (
          <p>Waiting for sensor data...</p>
        )}
      </div>
    </div>
  );
}