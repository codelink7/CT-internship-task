import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssetListPage from './pages/AssetListPage';
import AssetDetailsPage from './pages/AssetDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AssetListPage />} />
        <Route path="/assets/:id" element={<AssetDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}