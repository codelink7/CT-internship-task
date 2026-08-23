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

  const cellStyle = { padding: '12px', borderBottom: '1px solid #ccc', textAlign: 'left' as const };
  const headerStyle = { ...cellStyle, backgroundColor: '#f9f9f9' };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Assets Dashboard</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', border: '1px solid #ccc' }}>
        <thead>
          <tr>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Type</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td style={cellStyle}>
                <strong>{asset.name}</strong>
              </td>
              <td style={cellStyle}>{asset.type}</td>
              <td style={cellStyle}>
                <strong style={{ color: getStatusColor(asset.status) }}>
                  {asset.status}
                </strong>
              </td>
              <td style={cellStyle}>
                <Link to={`/assets/${asset.id}`} style={{ color: 'blue', textDecoration: 'none' }}>
                  View Live Details
                </Link>
              </td>
            </tr>
          ))}
          
          {assets.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                Loading or no assets found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}