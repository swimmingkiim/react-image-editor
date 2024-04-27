import { expect, test, describe, assertType } from "vitest";

import reducer, { FileMeta, fileMetaAction } from "../../src/redux/fileMeta";

describe("Test Redux - FileMeta", () => {
  test("should return FileMeta instance", () => {
    assertType<FileMeta>(reducer(undefined, { type: "unknown" }));
  });

  test("should return initial FileMeta instance", () => {
    const targetInitialFileMeta: FileMeta = {
      scale: {
        x: 1,
        y: 1,
      },
      position: {
        x: 0,
        y: 0,
      },
    };

    expect(reducer(undefined, { type: "unknown" })).toEqual(
      targetInitialFileMeta
    );
  });

  test("should return updated FileMeta instance", () => {
    const prevFileMeta: FileMeta = {
      scale: {
        x: 1,
        y: 1,
      },
      position: {
        x: 0,
        y: 0,
      },
    };

    const targetFileMeta: FileMeta = {
      scale: {
        x: 1.2,
        y: 1.5,
      },
      position: {
        x: 100,
        y: 50,
      },
    };

    const action = fileMetaAction.setFileMeta({
      scale: {
        x: 1.2,
        y: 1.5,
      },
      position: {
        x: 100,
        y: 50,
      },
    });

    expect(reducer(prevFileMeta, action)).toEqual(targetFileMeta);
  });
});
