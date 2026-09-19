import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import ProjectDetail from '@/pages/ProjectDetail';
import AgentOpticsDetail from '@/pages/AgentOpticsDetail';

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground overflow-x-hidden bg-background">
      <Navbar />
      <main className="flex-grow relative">
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/project/wagtail" element={<ProjectDetail />} />
            <Route path="/project/agentoptics" element={<AgentOpticsDetail />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
