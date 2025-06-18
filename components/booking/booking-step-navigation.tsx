import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { cn, scrollToTop } from '@/utils/helpers';
import { BookingStep } from '@/app/(app-layout)/booking/types';

interface BookingStepNavigationProps {
  onBack: () => void;
  onNext?: () => void;
  nextLabel: string;
  isLoading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  submitType?: boolean;
  stepCount?: BookingStep;
}

export function BookingStepNavigation({
  onBack,
  onNext,
  nextLabel,
  isLoading = false,
  loadingLabel = 'Saving...',
  disabled = false,
  submitType = false,
  stepCount,
}: BookingStepNavigationProps) {
  const handleBack = () => {
    scrollToTop();
    onBack();
  };

  const handleNext = () => {
    if (submitType || !onNext) return;
    if (stepCount !== BookingStep.CONFIRMATION) scrollToTop();
    onNext();
  };

  const buttonProps = submitType
    ? { type: 'submit' as const }
    : { type: 'button' as const, onClick: handleNext };

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-8 sticky bottom-0 bg-white p-4 -mx-4 -mb-4 border-t md:border-none md:p-0 md:mx-0 md:mb-0">
      <Button
        type="button"
        variant="outline"
        onClick={handleBack}
        className="w-full sm:w-auto flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
      <Button
        {...buttonProps}
        className={cn(
          'w-full sm:w-auto bg-rose-500 hover:bg-rose-600 transition-all duration-200',
          'disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400'
        )}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingLabel}
          </>
        ) : (
          nextLabel
        )}
      </Button>
    </div>
  );
}
