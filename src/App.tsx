import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';
import PlatformsPage from './pages/PlatformsPage';
import DataIngestionPage from './pages/DataIngestionPage';
import SentimentPage from './pages/SentimentPage';
import DemographicsPage from './pages/DemographicsPage';
import TrendsPage from './pages/TrendsPage';
import NetworkPage from './pages/NetworkPage';
import InformationFlowPage from './pages/InformationFlowPage';
import TimelinePage from './pages/TimelinePage';
import CrossPlatformPage from './pages/CrossPlatformPage';
import CopilotPage from './pages/CopilotPage';
import ReportsPage from './pages/ReportsPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page opens first at root URL */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard application routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Navigate to="/analysis/overview" replace />} />
          <Route path="/app" element={<Navigate to="/analysis/overview" replace />} />
          <Route path="/platforms" element={<PlatformsPage />} />
          <Route path="/data" element={<DataIngestionPage />} />
          <Route path="/analysis/overview" element={<OverviewPage />} />
          <Route path="/analysis/sentiment" element={<SentimentPage />} />
          <Route path="/analysis/demographics" element={<DemographicsPage />} />
          <Route path="/analysis/trends" element={<TrendsPage />} />
          <Route path="/analysis/network" element={<NetworkPage />} />
          <Route path="/analysis/flow" element={<InformationFlowPage />} />
          <Route path="/analysis/timeline" element={<TimelinePage />} />
          <Route path="/cross-platform" element={<CrossPlatformPage />} />
          <Route path="/copilot" element={<CopilotPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        {/* Catch-all redirect to Landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
