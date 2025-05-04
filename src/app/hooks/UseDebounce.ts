import { useEffect, useCallback, DependencyList } from "react";

export default function useDebounce(
  effect: () => void,
  deps: DependencyList,
  delay: number
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
