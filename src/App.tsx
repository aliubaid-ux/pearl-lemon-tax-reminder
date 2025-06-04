
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import CommonTaxIssues from './pages/CommonTaxIssues';
import LateSubmissionTemplates from './components/LateSubmissionTemplates';
import HMRCGuidance from './components/HMRCGuidance';
import DocumentationChecklist from './components/DocumentationChecklist';
import PenaltyCalculatorPage from './pages/PenaltyCalculatorPage';
import VATCalculatorPage from './pages/VATCalculatorPage';
import EmploymentStatusPage from './pages/EmploymentStatusPage';
import TradingAllowancePage from './pages/TradingAllowancePage';
import SettingsPage from './pages/SettingsPage';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Calculator, FileText, Settings, Wrench } from 'lucide-react';

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
                        <Calculator className="h-4 w-4 mr-2" />
                        Tools
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-80 p-4 bg-white border rounded-lg shadow-lg">
                          <div className="grid gap-3">
                            <NavLink to="/penalty-calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group">
                              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200">
                                <Calculator className="h-4 w-4 text-red-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Penalty Calculator</div>
                                <div className="text-sm text-gray-600">Calculate late filing penalties</div>
                              </div>
                            </NavLink>
                            <NavLink to="/vat-calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group">
                              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200">
                                <Calculator className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">VAT Calculator</div>
                                <div className="text-sm text-gray-600">Monitor VAT threshold</div>
                              </div>
                            </NavLink>
                            <NavLink to="/employment-status" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                                <Wrench className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Employment Status</div>
                                <div className="text-sm text-gray-600">Check your work status</div>
                              </div>
                            </NavLink>
                            <NavLink to="/trading-allowance" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group">
                              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200">
                                <Calculator className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Trading Allowance</div>
                                <div className="text-sm text-gray-600">Optimize your allowances</div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="font-medium text-gray-700 hover:text-blue-600">
                        <FileText className="h-4 w-4 mr-2" />
                        Resources
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-80 p-4 bg-white border rounded-lg shadow-lg">
                          <div className="grid gap-3">
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

                    <NavigationMenuItem>
                      <NavLink to="/settings" className={({ isActive }) => 
                        `font-medium transition-colors px-3 py-2 rounded-md flex items-center gap-2 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`
                      }>
                        <Settings className="h-4 w-4" />
                        Settings
                      </NavLink>
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
                <div className="space-y-2 pl-4">
                  <p className="text-sm font-medium text-gray-500">Tools</p>
                  <NavLink to="/penalty-calculator" className={({ isActive }) => 
                    `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                  } onClick={() => setIsMenuOpen(false)}>
                    Penalty Calculator
                  </NavLink>
                  <NavLink to="/vat-calculator" className={({ isActive }) => 
                    `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                  } onClick={() => setIsMenuOpen(false)}>
                    VAT Calculator
                  </NavLink>
                  <NavLink to="/employment-status" className={({ isActive }) => 
                    `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                  } onClick={() => setIsMenuOpen(false)}>
                    Employment Status
                  </NavLink>
                  <NavLink to="/trading-allowance" className={({ isActive }) => 
                    `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                  } onClick={() => setIsMenuOpen(false)}>
                    Trading Allowance
                  </NavLink>
                </div>
                <div className="space-y-2 pl-4">
                  <p className="text-sm font-medium text-gray-500">Resources</p>
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
                  <NavLink to="/documentation-checklist" className={({ isActive }) => 
                    `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                  } onClick={() => setIsMenuOpen(false)}>
                    Documentation
                  </NavLink>
                </div>
                <NavLink to="/settings" className={({ isActive }) => 
                  `block font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-700"}`
                } onClick={() => setIsMenuOpen(false)}>
                  Settings
                </NavLink>
              </div>
            )}
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/penalty-calculator" element={<PenaltyCalculatorPage />} />
            <Route path="/vat-calculator" element={<VATCalculatorPage />} />
            <Route path="/employment-status" element={<EmploymentStatusPage />} />
            <Route path="/trading-allowance" element={<TradingAllowancePage />} />
            <Route path="/settings" element={<SettingsPage />} />
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
            <Route path="/documentation-checklist" element={<DocumentationChecklist />} />
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
