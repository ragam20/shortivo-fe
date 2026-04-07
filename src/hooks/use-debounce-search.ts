import { useEffect, useState } from "react";

export function useDebounceSearch(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    });

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}
