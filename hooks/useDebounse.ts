import React from "react";

export const useDebounse = <T>(value: T, delay?: number) => {
   const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
   React.useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay || 1000);
      return () => {
         clearTimeout(handler);
      };
   }, [delay, value]);
   return debouncedValue;
};
