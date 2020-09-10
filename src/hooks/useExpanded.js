import {useState, useMemo, useCallback} from 'react';

export default function useExpanded() {
  const [isExpanded, setExpanded] = useState(false);
  const toggle = useCallback(() => {
    setExpanded(prevState => !prevState);
  }, []);

  const value = useMemo(
    () => ({
      isExpanded,
      toggle,
    }),
    [isExpanded, toggle],
  );

  return value;
}
