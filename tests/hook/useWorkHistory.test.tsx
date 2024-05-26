import React, { act, useState } from "react";
import { Provider } from "react-redux";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { StageData } from "../../src/redux/currentStageData";
import configureKonvaEditorStore from "../../src/redux/store";
import { initialStageDataList } from "../../src/redux/initilaStageDataList";
import useWorkHistory from "../../src/hook/useWorkHistory";

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
      current: { goToPast, goToFuture, recordPast, clearHistory, current },
    },
  } = renderHook(() => useWorkHistory(past, future, setPast, setFuture), {
    wrapper,
  });

  test("should return null current", () => {
    expect(current).toEqual(null);
  });

  test("should record past correctly", async () => {
    act(() => {
      recordPast(initialStageDataList[0].data);
    });

    waitFor(() => {
      expect(past[past.length - 1]).toEqual(initialStageDataList[0].data);
    });
  });

  test("should go to past correctly", () => {
    act(() => {
      goToPast();
    });

    waitFor(() => {
      expect(current).toEqual(initialStageDataList[0].data);
      expect(future[future.length - 1]).toEqual(initialStageDataList[0].data);
    });
  });

  test("should go to future correctly", async () => {
    act(() => {
      goToFuture();
    });
    waitFor(() => {
      expect(current).toEqual(initialStageDataList[0].data);
      expect(past[past.length - 1]).toEqual(initialStageDataList[0].data);
    });
  });

  test("should clear history correctly", async () => {
    act(() => {
      clearHistory();
    });
    waitFor(() => {
      expect(past).toEqual([]);
      expect(future).toEqual([]);
    });
  });
});
