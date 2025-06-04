
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Lightbulb, HelpCircle, MessageCircle, Star, FileText, Calculator, Calendar, AlertCircle, CheckCircle, Users, Heart } from 'lucide-react';

interface TaxEducationHubProps {
  userType: string;
}

const TaxEducationHub: React.FC<TaxEducationHubProps> = ({ userType }) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const basicConcepts = [
    {
      id: 'income-vs-profit',
      title: 'Income vs Profit - What\'s the Difference?',
      difficulty: 'Beginner',
      readTime: '3 min',
      content: 'Income is all the money coming into your business. Profit is what\'s left after you subtract your business expenses. Think of it like this: if you earned £1000 but spent £300 on business costs, your profit is £700.',
      example: 'Sarah sells handmade jewelry. She earned £2000 last month (income) but spent £600 on materials and £200 on packaging (expenses). Her profit = £2000 - £800 = £1200.',
      keyTakeaway: 'You pay tax on profit, not total income - so keep track of those expenses!'
    },
    {
      id: 'allowable-expenses',
      title: 'What Can I Claim as Business Expenses?',
      difficulty: 'Beginner',
      readTime: '4 min',
      content: 'Allowable expenses are costs that are "wholly and exclusively" for your business. This means the expense must be entirely for business purposes, not personal use.',
      example: 'Office supplies, travel for work, business insurance = ✅ Allowable. Personal groceries, family holiday, personal phone bill = ❌ Not allowable.',
      keyTakeaway: 'When in doubt, ask: "Is this expense purely for my business?" If yes, you can probably claim it.'
    },
    {
      id: 'self-assessment',
      title: 'Self Assessment - Don\'t Panic!',
      difficulty: 'Beginner',
      readTime: '5 min',
      content: 'Self Assessment is just a form where you tell HMRC about your income and expenses for the tax year. It\'s not as scary as it sounds - it\'s mostly just basic arithmetic.',
      example: 'Think of it like a receipt for your entire year. You\'re showing HMRC: "I earned this much, I spent this much on business, so I owe tax on this amount."',
      keyTakeaway: 'File by 31st January, pay what you owe, and you\'re done until next year!'
    }
  ];

  const confidenceBuilders = [
    {
      icon: Heart,
      title: 'You\'re Not Alone',
      content: 'Millions of people file taxes every year - including many who started exactly where you are now. Every tax expert was once a beginner.',
      color: 'pink'
    },
    {
      icon: CheckCircle,
      title: 'Small Steps = Big Progress',
      content: 'You don\'t need to understand everything at once. Each small thing you learn makes the next thing easier.',
      color: 'green'
    },
    {
      icon: Star,
      title: 'Mistakes Are Fixable',
      content: 'Made an error? HMRC allows corrections. Most mistakes are simple misunderstandings that can be easily resolved.',
      color: 'amber'
    },
    {
      icon: Users,
      title: 'Help Is Always Available',
      content: 'From our AI assistant to HMRC\'s own help resources, you\'re never stuck without support when you need it.',
      color: 'blue'
    }
  ];

  const interactiveTutorials = [
    {
      id: 'expense-tracker',
      title: 'Interactive Expense Tracker',
      description: 'Learn by doing - practice categorizing real business expenses',
      type: 'hands-on',
      estimatedTime: '10 min'
    },
    {
      id: 'deadline-planner',
      title: 'Personal Deadline Planner',
      description: 'Create your own tax calendar with reminders that work for you',
      type: 'planning',
      estimatedTime: '15 min'
    },
    {
      id: 'tax-scenario',
      title: 'Tax Scenario Simulator',
      description: 'See how different business decisions affect your tax bill',
      type: 'simulation',
      estimatedTime: '12 min'
    }
  ];

  return (
    <div id="help-center" className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-900 dark:text-indigo-100 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            Tax Education Hub
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
              Beginner-Friendly
            </Badge>
          </CardTitle>
          <p className="text-indigo-700 dark:text-indigo-300 text-lg">
            Learn taxes at your own pace with simple explanations, real examples, and confidence-building support.
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="basics">Tax Basics</TabsTrigger>
              <TabsTrigger value="confidence">Build Confidence</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Core Concepts Made Simple
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start here if you're new to taxes. These lessons use plain English and real examples.
                </p>
              </div>
              
              {basicConcepts.map((concept) => (
                <Card key={concept.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-900 dark:text-white">
                        {concept.title}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {concept.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {concept.readTime}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {activeLesson === concept.id ? (
                      <div className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300">{concept.content}</p>
                        
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Real Example:
                          </h4>
                          <p className="text-blue-800 dark:text-blue-200 text-sm">{concept.example}</p>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            Key Takeaway:
                          </h4>
                          <p className="text-green-800 dark:text-green-200 text-sm">{concept.keyTakeaway}</p>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveLesson(null)}
                          className="mt-4"
                        >
                          Close Lesson
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Learn the fundamentals with simple explanations and examples
                        </p>
                        <Button 
                          size="sm" 
                          onClick={() => setActiveLesson(concept.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Start Lesson
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="confidence" className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  You've Got This! 💪
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Feeling overwhelmed? These reminders will help boost your confidence.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {confidenceBuilders.map((builder, index) => {
                  const Icon = builder.icon;
                  return (
                    <Card key={index} className={`border-l-4 border-l-${builder.color}-500`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 bg-${builder.color}-100 dark:bg-${builder.color}-900/30 rounded-lg`}>
                            <Icon className={`h-5 w-5 text-${builder.color}-600 dark:text-${builder.color}-400`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {builder.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {builder.content}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Learn by Doing
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive tutorials that let you practice in a safe environment.
                </p>
              </div>
              
              {interactiveTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {tutorial.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {tutorial.description}
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs capitalize">
                            {tutorial.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {tutorial.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Try It Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Connect & Get Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join a community of people learning about taxes together.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <h4 className="font-semibold text-green-900 dark:text-green-100">Ask Questions</h4>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm mb-3">
                      No question is too basic. Our AI assistant and community are here to help.
                    </p>
                    <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20">
                      Ask a Question
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">Success Stories</h4>
                    </div>
                    <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                      Read how others overcame their tax fears and became confident.
                    </p>
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20">
                      Read Stories
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxEducationHub;
