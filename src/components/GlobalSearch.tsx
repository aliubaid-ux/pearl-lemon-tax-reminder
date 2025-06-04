
import React, { useState, useEffect } from 'react';
import { Search, Calendar, FileText, Calculator, Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { TaxDeadline } from '@/types/tax';

interface GlobalSearchProps {
  deadlines: TaxDeadline[];
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ deadlines, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    deadlines: TaxDeadline[];
    tools: Array<{id: string; title: string; description: string; path: string; icon: any}>;
    resources: Array<{id: string; title: string; description: string; path: string; icon: any}>;
  }>({
    deadlines: [],
    tools: [],
    resources: []
  });
  const navigate = useNavigate();

  const tools = [
    { id: 'penalty', title: 'Penalty Calculator', description: 'Calculate late filing penalties', path: '/penalty-calculator', icon: Calculator },
    { id: 'vat', title: 'VAT Calculator', description: 'Monitor VAT threshold', path: '/vat-calculator', icon: Calculator },
    { id: 'employment', title: 'Employment Status', description: 'Check your work status', path: '/employment-status', icon: FileText },
    { id: 'trading', title: 'Trading Allowance', description: 'Optimize your allowances', path: '/trading-allowance', icon: Calculator }
  ];

  const resources = [
    { id: 'issues', title: 'Common Tax Issues', description: 'Tax problems & solutions', path: '/common-tax-issues', icon: FileText },
    { id: 'hmrc', title: 'HMRC Guidance', description: 'Official resources', path: '/hmrc-guidance', icon: FileText },
    { id: 'docs', title: 'Documentation', description: 'Required documents checklist', path: '/documentation-checklist', icon: FileText },
    { id: 'templates', title: 'Templates', description: 'Late submission letter templates', path: '/late-submission-templates', icon: FileText }
  ];

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults({ deadlines: [], tools: [], resources: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    
    const filteredDeadlines = deadlines.filter(deadline => 
      deadline.title.toLowerCase().includes(query) ||
      deadline.description?.toLowerCase().includes(query) ||
      deadline.category.toLowerCase().includes(query)
    );

    const filteredTools = tools.filter(tool =>
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );

    const filteredResources = resources.filter(resource =>
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query)
    );

    setSearchResults({
      deadlines: filteredDeadlines.slice(0, 5),
      tools: filteredTools,
      resources: filteredResources
    });
  }, [searchQuery, deadlines]);

  const handleResultClick = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 bg-white shadow-2xl">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 p-4 border-b">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search deadlines, tools, and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 text-lg"
              autoFocus
            />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {searchQuery.length < 2 ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Start typing to search deadlines, tools, and resources</p>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {/* Deadlines Results */}
                {searchResults.deadlines.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Deadlines ({searchResults.deadlines.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.deadlines.map((deadline) => (
                        <div
                          key={deadline.id}
                          className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleResultClick('/')}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{deadline.title}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(deadline.date).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                            <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
                              {deadline.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools Results */}
                {searchResults.tools.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      Tools ({searchResults.tools.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.tools.map((tool) => (
                        <div
                          key={tool.id}
                          className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleResultClick(tool.path)}
                        >
                          <div className="flex items-center gap-3">
                            <tool.icon className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{tool.title}</p>
                              <p className="text-sm text-gray-600">{tool.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources Results */}
                {searchResults.resources.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Resources ({searchResults.resources.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleResultClick(resource.path)}
                        >
                          <div className="flex items-center gap-3">
                            <resource.icon className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">{resource.title}</p>
                              <p className="text-sm text-gray-600">{resource.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {searchResults.deadlines.length === 0 && 
                 searchResults.tools.length === 0 && 
                 searchResults.resources.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No results found for "{searchQuery}"</p>
                    <p className="text-sm mt-1">Try different keywords or check spelling</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalSearch;
