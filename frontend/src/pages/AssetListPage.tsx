import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { createAsset, getAssets } from '../apis';
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
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState<Asset['status']>('STOPPED');

  useEffect(() => {
    getAssets().then(setAssets);
  }, []);

  const cellStyle = { padding: '12px', borderBottom: '1px solid #ccc', textAlign: 'left' as const };
  const headerStyle = { ...cellStyle, backgroundColor: '#f9f9f9' };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    createAsset({ name, type, status })
      .then((newAsset) => {
        setAssets((prevAssets) => [...prevAssets, newAsset]);
        setName('');
        setType('');
        setStatus('STOPPED');
      })
      .catch((error) => {
        console.error('Error creating asset:', error);
      });
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Assets Dashboard</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #ddd', borderRadius: '6px' }}>
        <h3>Add New Asset</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Asset Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Asset Type (e.g. Pump)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value as Asset['status'])} style={{ padding: '8px' }}>
            <option value="STOPPED">STOPPED</option>
            <option value="RUNNING">RUNNING</option>
            <option value="ALARM">ALARM</option>
          </select>
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Create Asset
          </button>
        </div>
      </form>
      
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