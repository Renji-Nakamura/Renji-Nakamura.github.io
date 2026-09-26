import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import ProjectDetail from '@/pages/ProjectDetail';
import AgentOpticsDetail from '@/pages/AgentOpticsDetail';
import ArxivistDetail from '@/pages/ArxivistDetail';
import MetalGroundDetail from '@/pages/MetalGroundDetail';
import MetalGroundDocs from '@/pages/MetalGroundDocs';

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground overflow-x-clip bg-background">
      <Navbar />
      <main className="flex-grow relative">
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/project/wagtail" element={<ProjectDetail />} />
            <Route path="/project/agentoptics" element={<AgentOpticsDetail />} />
            <Route path="/project/arxivist" element={<ArxivistDetail />} />
            <Route path="/project/metalground" element={<MetalGroundDetail />} />
            <Route path="/project/metalground/docs" element={<MetalGroundDocs />} />
            <Route path="/metalground-docs" element={<MetalGroundDocs />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
