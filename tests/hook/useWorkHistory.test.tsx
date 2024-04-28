import React, { useState } from "react";
import { Provider } from "react-redux";

import { expect, test, describe } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useWorkHistory from "../../src/hook/useWorkHistory";
import { StageData } from "../../src/redux/currentStageData";
import configureKonvaEditorStore from "../../src/redux/store";

describe("Test hook - useWorkHistory", () => {
  const store = configureKonvaEditorStore();
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  const {
    result: {
      current: [past, setPast],
    },
  } = renderHook(() => useState<StageData[][]>([]), { wrapper });
  const {
    result: {
      current: [future, setFuture],
    },
  } = renderHook(() => useState<StageData[][]>([]), { wrapper });
  const {
    result: {
      current: {
        goToPast,
        goToFuture,
        recordPast,
        clearHistory,
        setCurrent,
        current,
      },
    },
  } = renderHook(() => useWorkHistory(past, future, setPast, setFuture), {
    wrapper,
  });
  test("should return null current", () => {
    expect(current).toEqual(null);
  });
});
