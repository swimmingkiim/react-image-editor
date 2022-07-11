const useLocalStorage = () => {
  const getValue = (key: string) =>
    window.localStorage.getItem(key) && window.localStorage.getItem(key)! !== "null"
      ? JSON.parse(window.localStorage.getItem(key)!)
      : null;

  const setValue = (key: string, value: any[] | { [key: string]: any }) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return {
    getValue,
    setValue,
  };
};

export default useLocalStorage;
