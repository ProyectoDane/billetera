import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';

import { getAllWish } from '../../../dataAccess/Wish';

export const useGetWishesFulfilled = () => {
  const [wishesFulfilled, setWishesFulfilled] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getWishes = async () => {
      try {
        const data = await getAllWish(true);
        setLoading(false);
        setWishesFulfilled(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getWishes();
  }, [isFocused, wishesFulfilled]);

  return { wishesFulfilled, loading };
};
