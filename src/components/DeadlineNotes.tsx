
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { StickyNote, Save, Edit3, Trash2 } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import { saveDeadlineNote, getDeadlineNote } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

interface DeadlineNotesProps {
  deadline: TaxDeadline;
}

const DeadlineNotes: React.FC<DeadlineNotesProps> = ({ deadline }) => {
  const [note, setNote] = useState(getDeadlineNote(deadline.id));
  const [isEditing, setIsEditing] = useState(false);
  const [tempNote, setTempNote] = useState(note);
  const { toast } = useToast();

  const handleSave = () => {
    saveDeadlineNote(deadline.id, tempNote);
    setNote(tempNote);
    setIsEditing(false);
    toast({
      title: "Note Saved",
      description: `Note saved for ${deadline.title}`,
    });
  };

  const handleDelete = () => {
    saveDeadlineNote(deadline.id, '');
    setNote('');
    setTempNote('');
    setIsEditing(false);
    toast({
      title: "Note Deleted",
      description: `Note removed from ${deadline.title}`,
    });
  };

  const handleCancel = () => {
    setTempNote(note);
    setIsEditing(false);
  };

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-yellow-600" />
            Personal Notes
          </div>
          {note && !isEditing && (
            <Badge variant="secondary" className="bg-yellow-200 text-yellow-800">
              Has Note
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          <div className="space-y-3">
            {note ? (
              <div className="p-3 bg-white rounded-lg border border-yellow-200 min-h-[80px]">
                <p className="text-gray-700 whitespace-pre-wrap">{note}</p>
              </div>
            ) : (
              <div className="p-3 bg-white/50 rounded-lg border border-dashed border-yellow-300 min-h-[80px] flex items-center justify-center">
                <p className="text-gray-500 italic">No notes added yet</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                {note ? 'Edit Note' : 'Add Note'}
              </Button>
              {note && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              placeholder={`Add your personal notes for ${deadline.title}...`}
              className="min-h-[100px] bg-white border-yellow-200 focus:border-yellow-400"
              autoFocus
            />
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Note
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 bg-white/50 p-2 rounded border border-yellow-200">
          <p><strong>Tip:</strong> Use notes to track your preparation progress, document requirements, or add personal reminders.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeadlineNotes;
