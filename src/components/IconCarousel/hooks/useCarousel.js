import { useState } from 'react';

export const useCarousel = (list = []) => {
  const [step, setStep] = useState(0);
  const [item, setItem] = useState(list[0]);
  const lastStep = list.length - 1;
  const firstStep = 0;

  const nextStep = () => {
    const index = step === lastStep ? firstStep : step + 1;
    setItem(list[index]);
    setStep(index);
  };

  const prevStep = () => {
    const index = step === firstStep ? lastStep : step - 1;
    setItem(list[index]);
    setStep(index);
  };

  return {
    item,
    nextStep,
    prevStep,
  };
};
