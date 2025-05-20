import { FC } from 'react';

export interface StepCounterProps {
  currentStep: number;
  steps: Array<{
    label: string;
    value: number;
  }>;
}

export const StepCounter: FC<StepCounterProps> = ({ currentStep, steps }) => {
  const progressBarHeight = '2px';
  const stepSize = '48px'; // h-12 = 48px

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center relative">
        {/* Progress Bar */}
        <div
          className="absolute"
          style={{
            top: `calc(${stepSize} / 2)`,
            left: `calc(${stepSize} / 2)`,
            right: `calc(${stepSize} / 2)`,
            transform: 'translateY(-50%)',
          }}
        >
          <div
            className="w-full bg-gray-100 rounded-full"
            style={{ height: progressBarHeight }}
          ></div>
          <div
            className="bg-rose-500 absolute inset-y-0 left-0 transition-all duration-500 ease-in-out rounded-full"
            style={{
              height: progressBarHeight,
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>

        {/* Step Markers */}
        {steps.map((step, index) => {
          const isCompleted = step.value < currentStep;
          const isCurrent = step.value === currentStep;

          return (
            <div key={step.value} className="flex flex-col items-center relative z-10 group">
              <div
                style={{ height: stepSize, width: stepSize }}
                className={`
                  relative rounded-full flex items-center justify-center 
                  transition-all duration-300 ease-in-out
                  ${
                    isCompleted
                      ? 'bg-rose-500 shadow-lg shadow-rose-200'
                      : isCurrent
                        ? 'bg-white border-2 border-rose-500'
                        : 'bg-white border-2 border-gray-200'
                  }
                  ${isCurrent && 'ring-4 ring-rose-50'}
                  ${!isCompleted && !isCurrent && 'group-hover:border-rose-200'}
                `}
              >
                {isCompleted ? (
                  <svg
                    className="w-6 h-6 text-white transition-transform duration-200 ease-in-out transform group-hover:scale-110"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span
                    className={`text-lg font-medium transition-colors duration-200
                      ${isCurrent ? 'text-rose-500' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                  >
                    {index + 1}
                  </span>
                )}
              </div>

              <div className="mt-3 text-center">
                <span
                  className={`
                    text-sm font-medium transition-colors duration-200
                    ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
