const useDebounceCallback = () => {
  const debounceCallback = (callback: (...values: any[]) => void, delay: number, values: any[]) => {
    setTimeout(() => {
      callback(...values);
    }, delay);
  };

  return {
    debounceCallback,
  };
};

export default useDebounceCallback;
