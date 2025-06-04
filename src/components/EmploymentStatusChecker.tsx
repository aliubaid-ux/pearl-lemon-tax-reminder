
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 'control',
    question: 'Who decides how, when and where you do your work?',
    options: [
      { value: 'client', label: 'The client tells me exactly what to do', score: 0 },
      { value: 'some-input', label: 'Client sets requirements, I decide how', score: 1 },
      { value: 'independent', label: 'I have complete control over my work', score: 2 }
    ]
  },
  {
    id: 'substitution',
    question: 'Can you send someone else to do the work instead of you?',
    options: [
      { value: 'no', label: 'No, it must be me personally', score: 0 },
      { value: 'with-permission', label: 'Only with client permission', score: 1 },
      { value: 'yes', label: 'Yes, I can arrange substitution freely', score: 2 }
    ]
  },
  {
    id: 'risk',
    question: 'Do you risk your own money if things go wrong?',
    options: [
      { value: 'no-risk', label: 'No financial risk to me', score: 0 },
      { value: 'some-risk', label: 'Some risk with expenses/equipment', score: 1 },
      { value: 'significant-risk', label: 'Yes, significant financial risk', score: 2 }
    ]
  },
  {
    id: 'integration',
    question: 'How integrated are you with the client\'s business?',
    options: [
      { value: 'fully-integrated', label: 'I\'m treated like a permanent employee', score: 0 },
      { value: 'somewhat-integrated', label: 'Some integration but clearly separate', score: 1 },
      { value: 'separate', label: 'I work independently/remotely', score: 2 }
    ]
  },
  {
    id: 'equipment',
    question: 'Who provides the main equipment and tools?',
    options: [
      { value: 'client-provides', label: 'Client provides everything', score: 0 },
      { value: 'mixed', label: 'Mix of client and my equipment', score: 1 },
      { value: 'i-provide', label: 'I provide all my own equipment', score: 2 }
    ]
  }
];

const EmploymentStatusChecker: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateStatus = () => {
    let totalScore = 0;
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) totalScore += option.score;
      }
    });

    const maxScore = questions.length * 2;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 75) {
      return {
        status: 'self-employed',
        confidence: 'high',
        message: 'Likely Self-Employed',
        description: 'You appear to be genuinely self-employed based on HMRC criteria.',
        taxImplications: 'File Self Assessment, pay Class 2 & 4 NICs, can claim business expenses',
        color: 'green'
      };
    } else if (percentage >= 40) {
      return {
        status: 'unclear',
        confidence: 'medium',
        message: 'Status Unclear - Seek Advice',
        description: 'Your employment status is borderline. This is a grey area that needs professional advice.',
        taxImplications: 'Consider HMRC Employment Status Indicator tool or professional consultation',
        color: 'amber'
      };
    } else {
      return {
        status: 'employed',
        confidence: 'high',
        message: 'Likely Employed',
        description: 'You may be classified as employed for tax purposes, even if contracted.',
        taxImplications: 'Client should operate PAYE, pay employer NICs, provide employment rights',
        color: 'red'
      };
    }
  };

  const restart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsComplete(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const result = isComplete ? calculateStatus() : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Employment Status Checker
        </CardTitle>
        <p className="text-sm text-gray-600">
          Determine if you're self-employed or employed for tax purposes
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isComplete ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">
                {currentQuestion.question}
              </h3>
              <div className="space-y-2">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {currentQuestionIndex > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              >
                Previous Question
              </Button>
            )}
          </div>
        ) : result && (
          <div className="space-y-4">
            <Alert className={
              result.color === 'green' ? 'border-green-300 bg-green-50' :
              result.color === 'amber' ? 'border-amber-300 bg-amber-50' :
              'border-red-300 bg-red-50'
            }>
              {result.color === 'green' ? <CheckCircle className="h-4 w-4" /> :
               result.color === 'amber' ? <Info className="h-4 w-4" /> :
               <AlertTriangle className="h-4 w-4" />}
              <AlertDescription>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className={
                      result.color === 'green' ? 'bg-green-100 text-green-800' :
                      result.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {result.confidence.toUpperCase()} CONFIDENCE
                    </Badge>
                    <span className="font-semibold">{result.message}</span>
                  </div>
                  <p className={
                    result.color === 'green' ? 'text-green-800' :
                    result.color === 'amber' ? 'text-amber-800' :
                    'text-red-800'
                  }>
                    {result.description}
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold mb-1">Tax Implications:</p>
                    <p className="text-sm">{result.taxImplications}</p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button onClick={restart} variant="outline">
                Take Test Again
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.gov.uk/guidance/check-employment-status-for-tax" target="_blank">
                  HMRC Official Tool
                </a>
              </Button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Why This Matters</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Wrong classification can lead to tax penalties and back-payments</li>
            <li>• IR35 legislation specifically targets "disguised employment"</li>
            <li>• Recent court cases show HMRC is actively pursuing misclassification</li>
            <li>• Getting it right protects both you and your clients</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmploymentStatusChecker;
