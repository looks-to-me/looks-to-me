import { useMount } from 'ahooks';
import { useState } from 'react';

export const useIsMounted = () => {
  const [state, setState] = useState(false);
  
  useMount(() => {
    setState(true);
  });
  
  return state;
};
