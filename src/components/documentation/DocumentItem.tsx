
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface DocumentItemProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ 
  title, 
  description, 
  priority, 
  category 
}) => {
  const [isChecked, setIsChecked] = useState(false);
  
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <div className={`p-4 border rounded-lg ${isChecked ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isChecked}
          onCheckedChange={setIsChecked}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-medium ${isChecked ? 'line-through text-gray-500' : ''}`}>
              {title}
            </h3>
            <Badge className={priorityColors[priority]} variant="outline">
              {priority}
            </Badge>
          </div>
          <p className={`text-sm ${isChecked ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentItem;
