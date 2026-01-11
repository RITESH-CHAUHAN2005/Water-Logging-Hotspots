import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Report {
  id: number;
  feedback?: 'positive' | 'negative' | null;
  feedbackDate?: string;
  [key: string]: unknown;
}

interface FeedbackButtonsProps {
  reportId: number;
  currentFeedback?: 'positive' | 'negative' | null;
  onFeedbackSubmit?: (feedback: 'positive' | 'negative') => void;
}

export function FeedbackButtons({ reportId, currentFeedback, onFeedbackSubmit }: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(currentFeedback || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedback = async (type: 'positive' | 'negative') => {
    // Don't allow changing feedback once submitted
    if (feedback) {
      toast.info('You have already submitted feedback for this report');
      return;
    }

    setIsSubmitting(true);

    // Get all reports
    const allReports: Report[] = JSON.parse(localStorage.getItem('userReports') || '[]');
    
    // Find and update the report
    const updatedReports = allReports.map((report: Report) => {
      if (report.id === reportId) {
        return {
          ...report,
          feedback: type,
          feedbackDate: new Date().toISOString(),
        };
      }
      return report;
    });

    // Save back to localStorage
    localStorage.setItem('userReports', JSON.stringify(updatedReports));

    // Trigger update event
    window.dispatchEvent(new Event('reportsUpdated'));

    setFeedback(type);
    setIsSubmitting(false);

    // Show success message
    const message = type === 'positive' 
      ? 'Thank you for your positive feedback! 👍' 
      : 'Thank you for your feedback. We\'ll work to improve. 👎';
    
    toast.success(message);

    // Call callback if provided
    if (onFeedbackSubmit) {
      onFeedbackSubmit(type);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs font-medium text-muted-foreground mr-2">
        {feedback ? 'Your feedback:' : 'How was the resolution?'}
      </div>
      
      <Button
        size="sm"
        variant={feedback === 'positive' ? 'default' : 'outline'}
        className={cn(
          "h-8 px-3 transition-all",
          feedback === 'positive' && "bg-success hover:bg-success/90 text-white border-success",
          !feedback && "hover:bg-success/10 hover:border-success"
        )}
        onClick={() => handleFeedback('positive')}
        disabled={isSubmitting || !!feedback}
      >
        <ThumbsUp className={cn(
          "h-4 w-4",
          feedback === 'positive' ? "fill-white" : ""
        )} />
        {feedback === 'positive' && <span className="ml-1">Satisfied</span>}
      </Button>

      <Button
        size="sm"
        variant={feedback === 'negative' ? 'default' : 'outline'}
        className={cn(
          "h-8 px-3 transition-all",
          feedback === 'negative' && "bg-destructive hover:bg-destructive/90 text-white border-destructive",
          !feedback && "hover:bg-destructive/10 hover:border-destructive"
        )}
        onClick={() => handleFeedback('negative')}
        disabled={isSubmitting || !!feedback}
      >
        <ThumbsDown className={cn(
          "h-4 w-4",
          feedback === 'negative' ? "fill-white" : ""
        )} />
        {feedback === 'negative' && <span className="ml-1">Unsatisfied</span>}
      </Button>
    </div>
  );
}
