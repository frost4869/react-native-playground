import {useEffect, useRef} from 'react';

export default function useEffectAfterMount(callback, dependencies) {
  const justMounted = useRef(true);
  useEffect(() => {
    if (!justMounted.current) {
      return callback();
    }
    justMounted.current = false;
  }, dependencies);
}
