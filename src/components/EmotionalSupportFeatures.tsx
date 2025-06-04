
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Smile, Star, Coffee, Sun, Moon, TrendingUp, Award, Target, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmotionalSupportFeaturesProps {
  completedTasks: number;
  totalTasks: number;
}

const EmotionalSupportFeatures: React.FC<EmotionalSupportFeaturesProps> = ({ 
  completedTasks, 
  totalTasks 
}) => {
  const [mood, setMood] = useState<string>('');
  const [currentEncouragement, setCurrentEncouragement] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const { toast } = useToast();

  const encouragements = [
    {
      icon: Star,
      message: "Every expert was once a beginner. You're doing great!",
      color: "yellow"
    },
    {
      icon: Heart,
      message: "Tax season doesn't have to be stressful when you're prepared.",
      color: "pink"
    },
    {
      icon: TrendingUp,
      message: "Small progress each day leads to big results.",
      color: "green"
    },
    {
      icon: Target,
      message: "You're building valuable life skills that will serve you forever.",
      color: "blue"
    },
    {
      icon: Award,
      message: "Taking control of your taxes is a sign of financial maturity.",
      color: "purple"
    }
  ];

  const moods = [
    { emoji: '😊', label: 'Confident', value: 'confident' },
    { emoji: '😰', label: 'Worried', value: 'worried' },
    { emoji: '😕', label: 'Confused', value: 'confused' },
    { emoji: '🤔', label: 'Curious', value: 'curious' },
    { emoji: '😤', label: 'Overwhelmed', value: 'overwhelmed' }
  ];

  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  useEffect(() => {
    // Load streak from localStorage
    const saved = localStorage.getItem('uk-tax-doctor-streak');
    if (saved) {
      const { days, lastVisit } = JSON.parse(saved);
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (lastVisit === today) {
        setStreakDays(days);
      } else if (lastVisit === yesterday) {
        const newStreak = days + 1;
        setStreakDays(newStreak);
        localStorage.setItem('uk-tax-doctor-streak', JSON.stringify({
          days: newStreak,
          lastVisit: today
        }));
      } else {
        setStreakDays(1);
        localStorage.setItem('uk-tax-doctor-streak', JSON.stringify({
          days: 1,
          lastVisit: today
        }));
      }
    } else {
      setStreakDays(1);
      localStorage.setItem('uk-tax-doctor-streak', JSON.stringify({
        days: 1,
        lastVisit: new Date().toDateString()
      }));
    }

    // Rotate encouragements
    const interval = setInterval(() => {
      setCurrentEncouragement((prev) => (prev + 1) % encouragements.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleMoodSelection = (selectedMood: string) => {
    setMood(selectedMood);
    
    const responses = {
      confident: "That's amazing! Confidence is key to success with taxes.",
      worried: "It's totally normal to feel worried. Remember, you have support every step of the way.",
      confused: "Confusion is just learning in progress. Take it one step at a time.",
      curious: "Curiosity is your superpower! Keep asking questions and exploring.",
      overwhelmed: "Take a deep breath. Break things down into smaller, manageable pieces."
    };

    toast({
      title: "Thanks for sharing!",
      description: responses[selectedMood as keyof typeof responses],
      duration: 4000,
    });
  };

  const currentEnc = encouragements[currentEncouragement];
  const EncIcon = currentEnc.icon;

  return (
    <div className="space-y-6">
      {/* Progress Celebration */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700">
        <CardHeader>
          <CardTitle className="text-xl text-emerald-900 dark:text-emerald-100 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            Your Progress is Amazing!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-700 dark:text-emerald-300 font-medium">
              Completed Tasks
            </span>
            <span className="text-emerald-900 dark:text-emerald-100 font-bold">
              {completedTasks} of {totalTasks}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-emerald-100 dark:bg-emerald-900/30" />
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {streakDays} day streak!
              </span>
            </div>
            {progressPercentage >= 50 && (
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                Halfway there! 🎉
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Encouragement */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-${currentEnc.color}-100 dark:bg-${currentEnc.color}-900/30 rounded-full`}>
              <EncIcon className={`h-6 w-6 text-${currentEnc.color}-600 dark:text-${currentEnc.color}-400`} />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                Daily Encouragement
              </h3>
              <p className="text-purple-700 dark:text-purple-300">
                {currentEnc.message}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Check-in */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900 dark:text-blue-100 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
              <Heart className="h-5 w-5" />
            </div>
            How are you feeling about taxes today?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {moods.map((moodOption) => (
              <Button
                key={moodOption.value}
                variant={mood === moodOption.value ? "default" : "outline"}
                className="h-16 flex flex-col gap-1 text-xs"
                onClick={() => handleMoodSelection(moodOption.value)}
              >
                <span className="text-2xl">{moodOption.emoji}</span>
                <span>{moodOption.label}</span>
              </Button>
            ))}
          </div>
          
          {mood && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Support resources for when you're feeling {mood}:
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline">
                  <Coffee className="h-4 w-4 mr-1" />
                  Take a Break
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="h-4 w-4 mr-1" />
                  Get Help
                </Button>
                <Button size="sm" variant="outline">
                  <Star className="h-4 w-4 mr-1" />
                  Quick Win
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Success Celebration */}
      {completedTasks > 0 && (
        <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-700">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <div className="inline-flex p-3 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full text-white">
                <Award className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
              You're Building Great Habits! 🌟
            </h3>
            <p className="text-amber-700 dark:text-amber-300 mb-4">
              Every task you complete is making you more confident and tax-savvy. Keep up the excellent work!
            </p>
            <div className="flex justify-center gap-2">
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                {completedTasks} tasks done
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                {streakDays} day streak
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmotionalSupportFeatures;
