import React, { useCallback, useEffect, useState } from "react";
import { StageData } from "../redux/currentStageData";
import useItem from "./useItem";

const useWorkHistory = (
  past: StageData[][],
  future: StageData[][],
  setPast: React.Dispatch<React.SetStateAction<StageData[][]>>,
  setFuture: React.Dispatch<React.SetStateAction<StageData[][]>>,
) => {
  const { alterItems } = useItem();
  const [current, setCurrent] = useState<StageData[] | null>(null);

  const goToPast = useCallback(() => {
    if (past.length > 0 && current) {
      const newFuture = [...current];
      const newStageData = [...past[past.length - 1]];
      setPast((prev) => [...prev.slice(0, past.length - 1)]);
      setFuture((prev) => [...prev, newFuture]);
      setCurrent(newStageData);
      alterItems(newStageData);
    }
  }, [past, current, setPast, setFuture, alterItems]);
  const goToFuture = useCallback(() => {
    if (future.length > 0 && current) {
      const newPast = [...current];
      const newStageData = future[future.length - 1];
      setFuture((prev) => [...prev.slice(0, future.length - 1)]);
      setPast((prev) => [...prev, newPast]);
      setCurrent(newStageData);
      alterItems(newStageData);
    }
  }, [future, current, setFuture, setPast, alterItems]);

  const recordPast = useCallback(
    (newCurrent: StageData[]) => {
      //
      if (newCurrent.length !== 0 && current !== null) {
        if (
          // current === null &&
          JSON.stringify(newCurrent) !== JSON.stringify(current)
        ) {
          setPast((prev) => [...prev, current]);
          setFuture([]);
        }
      }
      if (newCurrent.length !== 0) {
        setCurrent(newCurrent);
      }
    },
    [past, current, setPast, setFuture, setCurrent],
  );

  const clearHistory = () => {
    setPast([]);
    setFuture([]);
  };

  return {
    goToPast,
    goToFuture,
    recordPast,
    clearHistory,
    setCurrent,
    current,
  };
};

export default useWorkHistory;
