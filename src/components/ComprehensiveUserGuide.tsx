
import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Play, Pause, RotateCcw, CheckCircle, BookOpen, Calendar, Calculator, Settings, Bell, Download, Filter, Search, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModernCard from './ModernCard';
import AnimatedButton from './AnimatedButton';
import ModernBadge from './ModernBadge';

interface ComprehensiveUserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuideSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: React.ReactNode;
  estimatedTime: string;
}

const ComprehensiveUserGuide: React.FC<ComprehensiveUserGuideProps> = ({ isOpen, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isInteractiveMode, setIsInteractiveMode] = useState(true);

  const guideSections: GuideSection[] = [
    {
      id: 'welcome',
      title: 'Welcome to UK Tax Doctor',
      description: 'Your AI-powered tax compliance specialist',
      icon: BookOpen,
      estimatedTime: '2 min',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to UK Tax Doctor! 🩺</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Think of UK Tax Doctor as your personal tax specialist. We diagnose your tax obligations, 
              prescribe the right solutions, and help cure any compliance headaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernCard variant="glass" className="p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Smart Calendar System
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Personalized deadline tracking</li>
                <li>• Automatic priority assessment</li>
                <li>• One-click calendar integration</li>
                <li>• Mobile-friendly interface</li>
              </ul>
            </ModernCard>

            <ModernCard variant="glass" className="p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-600" />
                Professional Tools
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Penalty calculators</li>
                <li>• VAT threshold monitoring</li>
                <li>• Employment status checker</li>
                <li>• Trading allowance optimizer</li>
              </ul>
            </ModernCard>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <h4 className="font-bold text-blue-900 mb-3">🎯 What makes UK Tax Doctor special?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-blue-800">AI-Powered:</strong>
                <p className="text-blue-700">Intelligent recommendations based on your profile</p>
              </div>
              <div>
                <strong className="text-blue-800">Always Current:</strong>
                <p className="text-blue-700">Updated with latest HMRC requirements</p>
              </div>
              <div>
                <strong className="text-blue-800">Comprehensive:</strong>
                <p className="text-blue-700">Everything from deadlines to compliance tools</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'getting-started',
      title: 'Getting Started: Your Tax Profile',
      description: 'Set up your personalized tax dashboard',
      icon: Settings,
      estimatedTime: '3 min',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Settings className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Choose Your Tax Profile</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              This is the most important step - it determines which deadlines you see and which tools are available to you.
            </p>
          </div>

          <div className="space-y-4">
            <ModernCard variant="glass" className="p-5 border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-900 mb-2">👤 Self-Employed</h3>
              <p className="text-gray-600 text-sm mb-3">
                Choose this if you're a freelancer, consultant, sole trader, or run your own business without incorporating.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <strong className="text-blue-900 text-sm">You'll see deadlines for:</strong>
                <ul className="text-blue-800 text-xs mt-1 space-y-1">
                  <li>• Self Assessment returns and payments</li>
                  <li>• Class 2 National Insurance</li>
                  <li>• VAT registration and returns</li>
                  <li>• CIS monthly returns (if applicable)</li>
                </ul>
              </div>
            </ModernCard>

            <ModernCard variant="glass" className="p-5 border-l-4 border-purple-500">
              <h3 className="font-bold text-gray-900 mb-2">🏢 Company Director</h3>
              <p className="text-gray-600 text-sm mb-3">
                Choose this if you're a director of a limited company.
              </p>
              <div className="bg-purple-50 p-3 rounded-lg">
                <strong className="text-purple-900 text-sm">You'll see deadlines for:</strong>
                <ul className="text-purple-800 text-xs mt-1 space-y-1">
                  <li>• Corporation Tax returns and payments</li>
                  <li>• Annual accounts filing</li>
                  <li>• PAYE submissions</li>
                  <li>• P11D forms and Class 1A NI</li>
                </ul>
              </div>
            </ModernCard>

            <ModernCard variant="glass" className="p-5 border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-2">🔄 Both</h3>
              <p className="text-gray-600 text-sm mb-3">
                Choose this if you're both self-employed AND a company director.
              </p>
              <div className="bg-orange-50 p-3 rounded-lg">
                <strong className="text-orange-900 text-sm">You'll see ALL deadlines from both profiles above</strong>
              </div>
            </ModernCard>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">💡 Pro Tip</h4>
            <p className="text-amber-800 text-sm">
              You can change your profile anytime in the settings. Your dashboard will automatically update 
              to show the relevant deadlines for your new selection.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'calendar-navigation',
      title: 'Mastering Your Tax Calendar',
      description: 'Navigate deadlines like a pro',
      icon: Calendar,
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Understanding Your Tax Calendar</h2>
            <p className="text-gray-600">Learn to read and navigate your personalized deadline dashboard</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">🎨 Priority Color System</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div>
                    <strong className="text-red-900">High Priority</strong>
                    <p className="text-red-700 text-sm">Statutory deadlines with penalties</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                  <div>
                    <strong className="text-amber-900">Medium Priority</strong>
                    <p className="text-amber-700 text-sm">Important but some flexibility</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div>
                    <strong className="text-blue-900">Low Priority</strong>
                    <p className="text-blue-700 text-sm">Informational or optional</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Smart Deadline Groups</h3>
              <div className="space-y-3">
                <ModernCard variant="glass" className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🚨 Urgent (Next 7 days)</h4>
                  <p className="text-gray-600 text-sm">
                    Deadlines requiring immediate attention. These appear at the top with red indicators.
                  </p>
                </ModernCard>
                <ModernCard variant="glass" className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📅 Upcoming (Next 3 months)</h4>
                  <p className="text-gray-600 text-sm">
                    Deadlines you should start preparing for. Plan your workflow around these.
                  </p>
                </ModernCard>
                <ModernCard variant="glass" className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🔮 Future (Beyond 3 months)</h4>
                  <p className="text-gray-600 text-sm">
                    Long-term planning deadlines. Good for annual budgeting and preparation.
                  </p>
                </ModernCard>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">⌨️ Quick Navigation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">K</kbd>
                  <span className="text-sm text-gray-700">Quick search</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">F</kbd>
                  <span className="text-sm text-gray-700">Open filters</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">E</kbd>
                  <span className="text-sm text-gray-700">Export calendar</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">?</kbd>
                  <span className="text-sm text-gray-700">Show shortcuts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'professional-tools',
      title: 'Professional Tax Tools',
      description: 'Master the built-in calculators and utilities',
      icon: Calculator,
      estimatedTime: '5 min',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Calculator className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Tax Tools</h2>
            <p className="text-gray-600">Learn to use the powerful calculators and compliance tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernCard variant="glass" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900">Penalty Calculator</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Calculate the cost of late filing or payment penalties before they happen.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Use for:</span>
                  <span className="text-gray-700">Self Assessment, VAT, Corporation Tax</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Accuracy:</span>
                  <span className="text-green-600 font-semibold">99.9% accurate</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard variant="glass" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">VAT Calculator</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Monitor your turnover and check if you need to register for VAT.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Threshold 2024/25:</span>
                  <span className="text-gray-700">£90,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Updates:</span>
                  <span className="text-green-600 font-semibold">Real-time</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard variant="glass" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">Employment Status</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Determine if you're employed, self-employed, or caught by IR35 rules.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Based on:</span>
                  <span className="text-gray-700">HMRC ESI tool logic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">IR35 ready:</span>
                  <span className="text-green-600 font-semibold">Yes</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard variant="glass" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">Trading Allowance</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Check if you can use the £1,000 trading allowance instead of declaring expenses.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Max allowance:</span>
                  <span className="text-gray-700">£1,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax year:</span>
                  <span className="text-green-600 font-semibold">2024/25</span>
                </div>
              </div>
            </ModernCard>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
            <h4 className="font-bold text-purple-900 mb-3">🎯 Pro Tips for Using Tools</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-purple-800">Save Your Calculations:</strong>
                <p className="text-purple-700">All results can be exported or printed for your records</p>
              </div>
              <div>
                <strong className="text-purple-800">Use Throughout the Year:</strong>
                <p className="text-purple-700">Don't wait until deadline day - plan ahead with these tools</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'calendar-integration',
      title: 'Calendar Integration & Export',
      description: 'Sync deadlines with your preferred calendar app',
      icon: Download,
      estimatedTime: '3 min',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Download className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Never Miss a Deadline Again</h2>
            <p className="text-gray-600">Export all your deadlines to any calendar app in seconds</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">📲 One-Click Export</h3>
              <ModernCard variant="glass" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Choose Your Export Option</strong>
                      <p className="text-gray-600 text-sm">
                        Click the "Export Calendar" button to download all your personalized deadlines
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Import to Your Calendar</strong>
                      <p className="text-gray-600 text-sm">
                        Open the downloaded file in Apple Calendar, Google Calendar, Outlook, or any ICS-compatible app
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Get Automatic Reminders</strong>
                      <p className="text-gray-600 text-sm">
                        Each deadline includes a 7-day advance reminder automatically
                      </p>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">📱 Compatible Calendar Apps</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium text-blue-900">Apple Calendar</span>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-500 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium text-red-900">Google Calendar</span>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium text-blue-900">Outlook</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-500 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium text-gray-900">Any ICS App</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ What's Included in Your Export</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernCard variant="glass" className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📊 Complete Information</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Deadline title and description</li>
                    <li>• Priority level and category</li>
                    <li>• HMRC guidance links</li>
                    <li>• Penalty information</li>
                  </ul>
                </ModernCard>
                <ModernCard variant="glass" className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🔔 Smart Reminders</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• 7-day advance notifications</li>
                    <li>• Automatic categorization</li>
                    <li>• 12 months of deadlines</li>
                    <li>• Annual recurring events</li>
                  </ul>
                </ModernCard>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
            <h4 className="font-bold text-green-900 mb-3">💡 Best Practices</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-green-800">Update Regularly:</strong>
                <p className="text-green-700">Re-export quarterly or when you change your tax profile</p>
              </div>
              <div>
                <strong className="text-green-800">Set Additional Reminders:</strong>
                <p className="text-green-700">Add personal reminders 2-3 weeks before major deadlines</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'advanced-features',
      title: 'Advanced Features & Tips',
      description: 'Power user features and productivity tips',
      icon: Settings,
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Settings className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Power User Features</h2>
            <p className="text-gray-600">Unlock the full potential of UK Tax Doctor</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔍 Advanced Search & Filtering</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Search className="h-4 w-4 text-blue-600" />
                    Smart Search
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Search by deadline name or description</li>
                    <li>• Use keywords like "VAT", "Corporation Tax"</li>
                    <li>• Search by month: "January deadlines"</li>
                    <li>• Find by priority: "high priority"</li>
                  </ul>
                </ModernCard>
                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-purple-600" />
                    Advanced Filters
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Filter by priority level</li>
                    <li>• Show only upcoming deadlines</li>
                    <li>• Filter by category (returns, payments)</li>
                    <li>• Date range filtering</li>
                  </ul>
                </ModernCard>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔔 Smart Notifications</h3>
              <ModernCard variant="glass" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Bell className="h-5 w-5 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Intelligent Alert System</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        UK Tax Doctor monitors your deadlines and provides smart notifications based on priority and urgency.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">Urgent alerts for deadlines within 7 days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <span className="text-gray-700">Weekly digest of upcoming deadlines</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">Monthly overview of tax year planning</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Progress Tracking</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">Completion Status</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Track which deadlines you've completed and which still need attention.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completed</span>
                      <span className="text-green-600 font-semibold">8/12</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </ModernCard>
                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">Annual Overview</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Get insights into your tax compliance performance throughout the year.
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">On track for 2024/25</span>
                  </div>
                </ModernCard>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚙️ Customization Options</h3>
              <ModernCard variant="glass" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Theme Settings</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Light/dark mode</li>
                      <li>• Custom color schemes</li>
                      <li>• Accessibility options</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Display Options</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Calendar vs list view</li>
                      <li>• Deadline grouping</li>
                      <li>• Information density</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Export Settings</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Reminder timing</li>
                      <li>• Calendar format</li>
                      <li>• Included information</li>
                    </ul>
                  </div>
                </div>
              </ModernCard>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting & Support',
      description: 'Common issues and how to get help',
      icon: ExternalLink,
      estimatedTime: '2 min',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <ExternalLink className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Getting Help</h2>
            <p className="text-gray-600">Solutions to common issues and support resources</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔧 Common Issues</h3>
              <div className="space-y-4">
                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Calendar export not working?</h4>
                  <div className="text-gray-600 text-sm space-y-2">
                    <p>1. Check your browser allows downloads</p>
                    <p>2. Try a different browser or device</p>
                    <p>3. Ensure your calendar app supports ICS files</p>
                    <p>4. Clear browser cache and try again</p>
                  </div>
                </ModernCard>

                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Missing deadlines for your situation?</h4>
                  <div className="text-gray-600 text-sm space-y-2">
                    <p>1. Double-check your tax profile selection</p>
                    <p>2. Ensure you're viewing the correct tax year</p>
                    <p>3. Check if filters are hiding relevant deadlines</p>
                    <p>4. Some deadlines may be quarterly/monthly - adjust date range</p>
                  </div>
                </ModernCard>

                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">Calculator giving unexpected results?</h4>
                  <div className="text-gray-600 text-sm space-y-2">
                    <p>1. Verify all input values are correct</p>
                    <p>2. Check you're using the right tax year rates</p>
                    <p>3. Remember calculators use current HMRC rates</p>
                    <p>4. Complex situations may need professional advice</p>
                  </div>
                </ModernCard>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">📞 Getting Additional Support</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">🏢 Pearl Lemon Accountants</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    UK Tax Doctor is built by Pearl Lemon Accountants. For professional tax advice:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Complex tax situations</li>
                    <li>• Business tax planning</li>
                    <li>• HMRC investigations</li>
                    <li>• Annual accounts preparation</li>
                  </ul>
                </ModernCard>

                <ModernCard variant="glass" className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">🌐 HMRC Resources</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    For official guidance and submissions:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• HMRC online services</li>
                    <li>• Government Gateway</li>
                    <li>• Official deadline confirmations</li>
                    <li>• Personal Tax Account</li>
                  </ul>
                </ModernCard>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
            <h4 className="font-bold text-blue-900 mb-3">💡 Remember</h4>
            <p className="text-blue-800 text-sm">
              UK Tax Doctor is a planning and compliance tool. For complex tax situations, 
              unusual circumstances, or HMRC disputes, always consult with a qualified accountant 
              or tax advisor.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentSectionData = guideSections[currentSection];
  const progress = ((currentSection + 1) / guideSections.length) * 100;

  const handleNext = () => {
    if (currentSection < guideSections.length - 1) {
      setCurrentSection(currentSection + 1);
      if (!completedSections.includes(currentSectionData.id)) {
        setCompletedSections(prev => [...prev, currentSectionData.id]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSectionJump = (index: number) => {
    setCurrentSection(index);
  };

  const estimatedTotalTime = guideSections.reduce((total, section) => {
    const minutes = parseInt(section.estimatedTime);
    return total + minutes;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-5xl max-h-[95vh] overflow-hidden bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">UK Tax Doctor - Complete User Guide</CardTitle>
                <p className="text-gray-600 mt-1">
                  Master your tax compliance with this comprehensive guide
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <ModernBadge variant="info" size="sm">
                    {estimatedTotalTime} min total
                  </ModernBadge>
                  <ModernBadge variant="success" size="sm">
                    {completedSections.length}/{guideSections.length} completed
                  </ModernBadge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsInteractiveMode(!isInteractiveMode)}>
                {isInteractiveMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isInteractiveMode ? 'Browse Mode' : 'Guided Mode'}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        {isInteractiveMode ? (
          <div className="flex h-[calc(95vh-200px)]">
            {/* Sidebar Navigation */}
            <div className="w-80 border-r bg-gray-50 overflow-y-auto">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Guide Sections</h3>
                <div className="space-y-2">
                  {guideSections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionJump(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        index === currentSection 
                          ? 'bg-blue-100 border-blue-300 border' 
                          : 'hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <section.icon className={`h-5 w-5 ${
                          index === currentSection ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <span className={`font-medium text-sm ${
                          index === currentSection ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {section.title}
                        </span>
                        {completedSections.includes(section.id) && (
                          <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 ml-8">{section.description}</p>
                      <div className="flex items-center gap-2 mt-2 ml-8">
                        <span className="text-xs text-gray-500">{section.estimatedTime}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <currentSectionData.icon className="h-8 w-8 text-blue-600" />
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{currentSectionData.title}</h1>
                      <p className="text-gray-600 text-lg">{currentSectionData.description}</p>
                    </div>
                    <ModernBadge variant="info" className="ml-auto">
                      {currentSectionData.estimatedTime}
                    </ModernBadge>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  {currentSectionData.content}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Browse mode - show all sections in tabs
          <div className="h-[calc(95vh-200px)] overflow-y-auto">
            <Tabs defaultValue={guideSections[0].id} className="w-full">
              <TabsList className="grid w-full grid-cols-7 h-auto p-2 bg-gray-100">
                {guideSections.map((section) => (
                  <TabsTrigger 
                    key={section.id} 
                    value={section.id}
                    className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-white"
                  >
                    <section.icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{section.title.split(':')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {guideSections.map((section) => (
                <TabsContent key={section.id} value={section.id} className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <section.icon className="h-8 w-8 text-blue-600" />
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">{section.title}</h1>
                        <p className="text-gray-600 text-lg">{section.description}</p>
                      </div>
                      <ModernBadge variant="info" className="ml-auto">
                        {section.estimatedTime}
                      </ModernBadge>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    {section.content}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {isInteractiveMode && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex justify-between">
              <div className="flex gap-2">
                {currentSection > 0 && (
                  <AnimatedButton variant="glass" onClick={handlePrevious} icon={ArrowLeft}>
                    Previous
                  </AnimatedButton>
                )}
                <AnimatedButton variant="glass" onClick={onClose}>
                  Close Guide
                </AnimatedButton>
              </div>
              
              {currentSection < guideSections.length - 1 ? (
                <AnimatedButton variant="primary" onClick={handleNext} icon={ArrowRight}>
                  Next Section
                </AnimatedButton>
              ) : (
                <AnimatedButton variant="primary" onClick={onClose} icon={CheckCircle}>
                  Complete Guide
                </AnimatedButton>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ComprehensiveUserGuide;
