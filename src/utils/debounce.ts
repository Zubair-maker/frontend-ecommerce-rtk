/* eslint-disable @typescript-eslint/no-explicit-any */

export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>; // Cross-environment type
  
    return (...args: Parameters<T>): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };