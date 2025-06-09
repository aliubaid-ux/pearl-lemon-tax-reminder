
import { useState } from 'react';
import { TaxDeadline } from '@/types/tax';
import { useToast } from '@/hooks/use-toast';
import { exportToCSV, printCalendar, shareDeadlines } from '@/utils/exportUtils';

interface UseCalendarHandlersProps {
  deadlines: TaxDeadline[];
  userType: string;
  onMonthChange: (date: Date) => void;
  selectedMonth: Date;
  onExport?: () => void;
}

export const useCalendarHandlers = ({
  deadlines,
  userType,
  onMonthChange,
  selectedMonth,
  onExport
}: UseCalendarHandlersProps) => {
  const [selectedDeadline, setSelectedDeadline] = useState<TaxDeadline | null>(null);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      try {
        exportToCSV(deadlines);
        toast({
          title: "Export successful",
          description: "Calendar data has been downloaded as CSV",
        });
      } catch (error) {
        toast({
          title: "Export failed",
          description: "There was an error exporting the calendar data",
          variant: "destructive"
        });
      }
    }
  };

  const handlePrint = () => {
    try {
      printCalendar(deadlines, userType);
      toast({
        title: "Print initiated",
        description: "Calendar is being prepared for printing",
      });
    } catch (error) {
      toast({
        title: "Print failed",
        description: "There was an error preparing the calendar for printing",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    try {
      await shareDeadlines(deadlines, userType);
      toast({
        title: "Share successful",
        description: "Calendar data has been shared or copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Share failed",
        description: "There was an error sharing the calendar data",
        variant: "destructive"
      });
    }
  };

  const handlePreviousMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    onMonthChange(newMonth);
  };

  const handleGoToToday = () => {
    onMonthChange(new Date());
  };

  const handleDateJump = (date: Date) => {
    onMonthChange(date);
  };

  const handleDeadlineClick = (deadline: TaxDeadline) => {
    setSelectedDeadline(deadline);
    setShowDeadlineModal(true);
  };

  const handleDateClick = (date: Date) => {
    const dayDeadlines = deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate.toDateString() === date.toDateString();
    });

    if (dayDeadlines.length === 0) {
      toast({
        title: "No deadlines",
        description: `No tax deadlines on ${date.toLocaleDateString('en-GB')}`,
      });
    } else if (dayDeadlines.length === 1) {
      handleDeadlineClick(dayDeadlines[0]);
    } else {
      toast({
        title: `${dayDeadlines.length} deadlines`,
        description: `Click on a specific deadline to view details`,
      });
    }
  };

  return {
    selectedDeadline,
    setSelectedDeadline,
    showDeadlineModal,
    setShowDeadlineModal,
    handleExport,
    handlePrint,
    handleShare,
    handlePreviousMonth,
    handleNextMonth,
    handleGoToToday,
    handleDateJump,
    handleDeadlineClick,
    handleDateClick
  };
};
