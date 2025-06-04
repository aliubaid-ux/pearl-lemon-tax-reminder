
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import LateSubmissionTemplates from './components/LateSubmissionTemplates';
import HMRCGuidance from './components/HMRCGuidance';
import DocumentationChecklist from './components/DocumentationChecklist';
import CommonTaxIssues from './pages/CommonTaxIssues';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-100 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                </span>
                <h1 className="text-xl font-bold">UK Tax Calendar</h1>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-blue-600" : "text-gray-600 hover:text-blue-600"}>
                  Dashboard
                </NavLink>
                <NavLink to="/common-tax-issues" className={({ isActive }) => isActive ? "font-bold text-blue-600" : "text-gray-600 hover:text-blue-600"}>
                  Common Issues
                </NavLink>
                <NavLink to="/late-submission-templates" className={({ isActive }) => isActive ? "font-bold text-blue-600" : "text-gray-600 hover:text-blue-600"}>
                  Late Submission
                </NavLink>
                <NavLink to="/hmrc-guidance" className={({ isActive }) => isActive ? "font-bold text-blue-600" : "text-gray-600 hover:text-blue-600"}>
                  HMRC Guidance
                </NavLink>
                <NavLink to="/documentation-checklist" className={({ isActive }) => isActive ? "font-bold text-blue-600" : "text-gray-600 hover:text-blue-600"}>
                  Documentation
                </NavLink>
              </div>

              <button className="md:hidden p-2" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 space-y-3 pb-3">
                <NavLink to="/" className={({ isActive }) => isActive ? "block font-bold text-blue-600" : "block text-gray-600"} onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/common-tax-issues" className={({ isActive }) => isActive ? "block font-bold text-blue-600" : "block text-gray-600"} onClick={() => setIsMenuOpen(false)}>
                  Common Issues
                </NavLink>
                <NavLink to="/late-submission-templates" className={({ isActive }) => isActive ? "block font-bold text-blue-600" : "block text-gray-600"} onClick={() => setIsMenuOpen(false)}>
                  Late Submission
                </NavLink>
                <NavLink to="/hmrc-guidance" className={({ isActive }) => isActive ? "block font-bold text-blue-600" : "block text-gray-600"} onClick={() => setIsMenuOpen(false)}>
                  HMRC Guidance
                </NavLink>
                <NavLink to="/documentation-checklist" className={({ isActive }) => isActive ? "block font-bold text-blue-600" : "block text-gray-600"} onClick={() => setIsMenuOpen(false)}>
                  Documentation
                </NavLink>
              </div>
            )}
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/common-tax-issues" element={<CommonTaxIssues />} />
            <Route path="/late-submission-templates" element={
              <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">Late Submission Templates</h1>
                <LateSubmissionTemplates />
              </div>
            } />
            <Route path="/hmrc-guidance" element={
              <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">HMRC Guidance</h1>
                <HMRCGuidance />
              </div>
            } />
            <Route path="/documentation-checklist" element={
              <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">Documentation Checklist</h1>
                <DocumentationChecklist />
              </div>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-gray-100 border-t py-4">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>UK Tax Calendar Tool - For guidance only. Always consult official HMRC sources or a qualified tax professional.</p>
            <p className="mt-1">© 2023 UK Tax Calendar. Not affiliated with HMRC.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
