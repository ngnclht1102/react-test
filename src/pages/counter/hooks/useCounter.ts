import { useCallback, useState } from 'react';

export default function useCounter() {
  const [counter, setCounter] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  const onSelectStep = useCallback(
    (value: string) => {
      const newStep = parseInt(value, 10);
      if (newStep) {
        setStep(newStep);
      } else {
        alert('Set step failed');
      }
    },
    [setStep],
  );

  const onIncrease = useCallback(() => {
    setCounter(step + counter);
  }, [step, counter]);

  const onDecrease = useCallback(() => {
    const newValue = counter - step;
    if (newValue >= 0) {
      setCounter(newValue);
    } else {
      alert("Can't decrease more!");
    }
  }, [step, counter]);

  return {
    counter,
    step,
    onDecrease,
    onIncrease,
    onSelectStep,
  };
}
