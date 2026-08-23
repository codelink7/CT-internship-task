import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAssets } from '../apis';
import type { Asset } from '../types';

const getStatusColor = (status: Asset['status']) => {
  switch (status) {
    case 'RUNNING':
      return 'green';
    case 'STOPPED':
      return 'gray';
    case 'ALARM':
      return 'red';
    default:
      return 'black';
  }
};
export default function AssetListPage() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getAssets().then(setAssets);
  }, []);


  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Assets Dashboard</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {assets.map((asset) => (
          <div key={asset.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{asset.name}</h3>
            <p>Type: {asset.type}</p>
            <p>Status: <strong style={{ color: getStatusColor(asset.status) }}>{asset.status}</strong></p>
            <Link to={`/assets/${asset.id}`}>View Live Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}