
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import SelfEmployedPage from './pages/SelfEmployedPage';
import CompanyDirectorPage from './pages/CompanyDirectorPage';
import BothProfilesPage from './pages/BothProfilesPage';
import PenaltiesPage from './pages/PenaltiesPage';
import CalendarViewPage from './pages/CalendarViewPage';
import LateSubmissionTemplates from './components/LateSubmissionTemplates';
import HMRCGuidance from './components/HMRCGuidance';
import DocumentationChecklist from './components/DocumentationChecklist';
import CommonTaxIssues from './pages/CommonTaxIssues';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Calculator, Settings, FileText, Bell, Calendar, Users, Building, UserCog, AlertTriangle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 pearl-gradient rounded-xl flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">UK Tax Calendar</h1>
                  <p className="text-sm text-gray-600">Professional Tax Deadline Management</p>
                </div>
              </div>

              <div className="hidden md:flex items-center">
                <NavigationMenu>
                  <NavigationMenuList className="space-x-2">
                    <NavigationMenuItem>
                      <NavLink to="/" className={({ isActive }) => 
                        `font-medium transition-colors px-3 py-2 rounded-md ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`
                      }>
                        Dashboard
                      </NavLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="font-medium text-gray-700 hover:text-blue-600">
                        <Users className="h-4 w-4 mr-2" />
                        Profiles
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-80 p-4 bg-white border rounded-lg shadow-lg">
                          <div className="grid gap-3">
                            <NavLink to="/self-employed" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                                <Users className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Self-Employed</div>
                                <div className="text-sm text-gray-600">Freelancers & sole traders</div>
                              </div>
                            </NavLink>
                            <NavLink to="/company-director" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group">
                              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200">
                                <Building className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Company Director</div>
                                <div className="text-sm text-gray-600">Business owners & directors</div>
                              </div>
                            </NavLink>
                            <NavLink to="/both-profiles" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group">
                              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200">
                                <UserCog className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Both Profiles</div>
                                <div className="text-sm text-gray-600">Self-employed + director</div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavLink to="/calendar-view" className={({ isActive }) => 
                        `font-medium transition-colors px-3 py-2 rounded-md flex items-center gap-2 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`
                      }>
                        <Calendar className="h-4 w-4" />
                        Calendar
                      </NavLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="font-medium text-gray-700 hover:text-blue-600">
                        <Calculator className="h-4 w-4 mr-2" />
                        Tax Tools
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-80 p-4 bg-white border rounded-lg shadow-lg">
                          <div className="grid gap-3">
                            <NavLink to="/penalties" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group">
                              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Penalty Calculator</div>
                                <div className="text-sm text-gray-600">Calculate late submission penalties</div>
                              </div>
                            </NavLink>
                            <NavLink to="/common-tax-issues" className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group">
                              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200">
                                <FileText className="h-4 w-4 text-orange-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Common Issues</div>
                                <div className="text-sm text-gray-600">Tax problems & solutions</div>
                              </div>
                            </NavLink>
                            <NavLink to="/hmrc-guidance" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                                <FileText className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">HMRC Guidance</div>
                                <div className="text-sm text-gray-600">Official resources & links</div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="font-medium text-gray-700 hover:text-blue-600">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-80 p-4 bg-white border rounded-lg shadow-lg">
                          <div className="grid gap-3">
                            <a href="#reminders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group">
                              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200">
                                <Bell className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Email Reminders</div>
                                <div className="text-sm text-gray-600">Set up deadline notifications</div>
                              </div>
                            </a>
                            <NavLink to="/documentation-checklist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group">
                              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200">
                                <FileText className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Documentation</div>
                                <div className="text-sm text-gray-600">Required documents checklist</div>
                              </div>
                            </NavLink>
                            <NavLink to="/late-submission-templates" className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors group">
                              <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200">
                                <FileText className="h-4 w-4 text-amber-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Templates</div>
                                <div className="text-sm text-gray-600">Late submission letter templates</div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <button 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
                onClick={toggleMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 space-y-3 pb-3 border-t pt-4">
                <NavLink to="/" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/calendar-view" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  Calendar View
                </NavLink>
                <NavLink to="/self-employed" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  Self-Employed
                </NavLink>
                <NavLink to="/company-director" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  Company Director
                </NavLink>
                <NavLink to="/both-profiles" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  Both Profiles
                </NavLink>
                <NavLink to="/penalties" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  Penalties
                </NavLink>
                <NavLink to="/common-tax-issues" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  Common Issues
                </NavLink>
                <NavLink to="/hmrc-guidance" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  HMRC Guidance
                </NavLink>
              </div>
            )}
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calendar-view" element={<CalendarViewPage />} />
            <Route path="/self-employed" element={<SelfEmployedPage />} />
            <Route path="/company-director" element={<CompanyDirectorPage />} />
            <Route path="/both-profiles" element={<BothProfilesPage />} />
            <Route path="/penalties" element={<PenaltiesPage />} />
            <Route path="/common-tax-issues" element={<CommonTaxIssues />} />
            <Route path="/late-submission-templates" element={
              <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">Late Submission Templates</h1>
                  <LateSubmissionTemplates />
                </div>
              </div>
            } />
            <Route path="/hmrc-guidance" element={
              <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">HMRC Guidance</h1>
                  <HMRCGuidance />
                </div>
              </div>
            } />
            <Route path="/documentation-checklist" element={
              <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">Documentation Checklist</h1>
                  <DocumentationChecklist />
                </div>
              </div>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-white border-t py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 mb-2">
                Professional tax deadline management for UK taxpayers and accountants
              </p>
              <p className="text-sm text-gray-500">
                For guidance only. Always consult official HMRC sources or a qualified tax professional.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                © 2025 Pearl Lemon Accountants. Not affiliated with HMRC.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
