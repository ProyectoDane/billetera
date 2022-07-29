import { useContext, useEffect } from 'react';
import { ToggleContext } from './Card';

const CardCollapse = ({ children }) => {
  const { setExpandable } = useContext(ToggleContext);

  useEffect(() => {
    setExpandable(children);
  }, [children]);

  return null;
};

export default CardCollapse;
