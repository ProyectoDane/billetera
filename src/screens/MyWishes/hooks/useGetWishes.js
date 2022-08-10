import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { getAllWish } from '../../../dataAccess/Wish';

export const useGetWishes = () => {
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(true);
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWishes = async () => {
      try {
        const data = await getAllWish(false);
        setLoading(false);
        setWishes(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getWishes();
  }, [isFocused, refresh]);

  return { wishes, loading, setRefresh };
};
