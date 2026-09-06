import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import AgentOpticsDetail from './pages/AgentOpticsDetail.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#0071E3] selection:text-white overflow-x-hidden">
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
