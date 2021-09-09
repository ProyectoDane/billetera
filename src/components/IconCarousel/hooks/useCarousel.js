import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { whishesList } from '../../../mockData/deseos';

export const useCarousel = () => {
  const { setValue } = useFormContext();

  const iconList = whishesList.map((item) => [item.icon, item.name]);
  const [step, setStep] = useState(0);
  const [item, setItem] = useState(iconList[step]);

  const lastStep = iconList.length - 1;
  const firstStep = 0;

  const nextStep = () =>
    step === lastStep
      ? (setItem(iconList[firstStep]), setStep(firstStep))
      : (setItem(iconList[step + 1]), setStep(step + 1));

  const prevStep = () =>
    step === firstStep
      ? (setItem(iconList[lastStep]), setStep(lastStep))
      : (setItem(iconList[step - 1]), setStep(step - 1));

  useEffect(() => {
    setValue('icon', item ? item[0] : null);
    setValue('name', item ? item[1] : 'EJEMPLO');
  });

  return {
    item,
    nextStep,
    prevStep,
  };
};
