
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, CheckCircle, Info } from 'lucide-react';

const VATThresholdMonitor: React.FC = () => {
  const [currentTurnover, setCurrentTurnover] = useState('');
  const [projectedTurnover, setProjectedTurnover] = useState('');
  
  const VAT_THRESHOLD = 85000;
  const current = parseFloat(currentTurnover) || 0;
  const projected = parseFloat(projectedTurnover) || current;
  
  const getVATStatus = () => {
    if (projected >= VAT_THRESHOLD) {
      return {
        status: 'must-register',
        urgency: 'high',
        message: 'You must register for VAT immediately',
        detail: 'Your turnover exceeds the £85,000 threshold. You have 30 days from when you exceeded it to register.',
        action: 'Register for VAT now'
      };
    } else if (projected >= VAT_THRESHOLD * 0.9) {
      return {
        status: 'approaching',
        urgency: 'medium',
        message: 'VAT registration likely needed soon',
        detail: `You're ${((projected / VAT_THRESHOLD) * 100).toFixed(1)}% of the way to the £85,000 threshold.`,
        action: 'Monitor closely and prepare for registration'
      };
    } else if (projected >= VAT_THRESHOLD * 0.75) {
      return {
        status: 'monitor',
        urgency: 'low',
        message: 'Keep monitoring your turnover',
        detail: `You're ${((projected / VAT_THRESHOLD) * 100).toFixed(1)}% of the way to the VAT threshold.`,
        action: 'Review quarterly'
      };
    } else {
      return {
        status: 'safe',
        urgency: 'none',
        message: 'No VAT registration required',
        detail: 'Your turnover is well below the VAT threshold.',
        action: 'Continue monitoring'
      };
    }
  };

  const vatStatus = getVATStatus();
  const remainingBuffer = Math.max(0, VAT_THRESHOLD - projected);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          VAT Threshold Monitor
        </CardTitle>
        <p className="text-sm text-gray-600">
          Track your turnover against the £85,000 VAT registration threshold
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="current-turnover">Current Annual Turnover (£)</Label>
            <Input
              id="current-turnover"
              type="number"
              placeholder="0"
              value={currentTurnover}
              onChange={(e) => setCurrentTurnover(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="projected-turnover">Projected Year-End Turnover (£)</Label>
            <Input
              id="projected-turnover"
              type="number"
              placeholder="0"
              value={projectedTurnover}
              onChange={(e) => setProjectedTurnover(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {projected > 0 && (
          <>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress to VAT Threshold</span>
                <span className="text-sm text-gray-600">
                  £{projected.toLocaleString()} / £85,000
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    projected >= VAT_THRESHOLD ? 'bg-red-500' :
                    projected >= VAT_THRESHOLD * 0.9 ? 'bg-amber-500' :
                    projected >= VAT_THRESHOLD * 0.75 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(100, (projected / VAT_THRESHOLD) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {Math.min(100, (projected / VAT_THRESHOLD) * 100).toFixed(1)}% of threshold
              </p>
            </div>

            <Alert className={
              vatStatus.urgency === 'high' ? 'border-red-300 bg-red-50' :
              vatStatus.urgency === 'medium' ? 'border-amber-300 bg-amber-50' :
              vatStatus.urgency === 'low' ? 'border-yellow-300 bg-yellow-50' :
              'border-green-300 bg-green-50'
            }>
              {vatStatus.urgency === 'high' ? <AlertTriangle className="h-4 w-4" /> :
               vatStatus.urgency === 'medium' ? <Info className="h-4 w-4" /> :
               <CheckCircle className="h-4 w-4" />}
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={
                      vatStatus.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      vatStatus.urgency === 'medium' ? 'bg-amber-100 text-amber-800' :
                      vatStatus.urgency === 'low' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {vatStatus.status.toUpperCase().replace('-', ' ')}
                    </Badge>
                    <span className="font-semibold">{vatStatus.message}</span>
                  </div>
                  <p className={
                    vatStatus.urgency === 'high' ? 'text-red-800' :
                    vatStatus.urgency === 'medium' ? 'text-amber-800' :
                    vatStatus.urgency === 'low' ? 'text-yellow-800' :
                    'text-green-800'
                  }>
                    {vatStatus.detail}
                  </p>
                  <p className="font-medium">
                    Next Step: {vatStatus.action}
                  </p>
                  {remainingBuffer > 0 && (
                    <p className="text-sm text-gray-600">
                      💰 You can earn £{remainingBuffer.toLocaleString()} more before VAT registration
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">VAT Registration Key Points</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• VAT registration required when turnover exceeds £85,000</li>
            <li>• You have 30 days from exceeding threshold to register</li>
            <li>• Voluntary registration available below threshold</li>
            <li>• Consider quarterly vs annual accounting schemes</li>
            <li>• Late registration penalties start at £400+</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VATThresholdMonitor;
