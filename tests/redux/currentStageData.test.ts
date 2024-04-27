import { expect, test, describe, assertType } from "vitest";

import reducer, {
  StageData,
  stageDataAction,
} from "../../src/redux/currentStageData";
import { EntityState } from "@reduxjs/toolkit";

const testItem = {
  id: "QxiYE-HAI311pw98Nqtx9",
  attrs: {
    name: "label-target",
    "data-item-type": "text",
    width: 120,
    height: 36,
    fill: "#00000",
    x: 544.1693780910495,
    y: 158.73013128325812,
    fontSize: 30,
    fontFamily: "'Jua', sans-serif",
    text: "이용방법",
    textAlign: "left",
    verticalAlign: "top",
    zIndex: 0,
    brightness: 0,
    updatedAt: 1648466614233,
    "data-frame-type": "text",
    id: "QxiYE-HAI311pw98Nqtx9",
    align: "center",
    opacity: 1,
    rotation: 0,
    draggable: true,
    visible: true,
    scaleX: 0.7511177030169971,
    scaleY: 0.7511177030169944,
    offsetX: 0,
    offsetY: 0,
    skewX: 0,
    skewY: 0,
  },
  className: "Shape",
  children: [],
};

describe("Test Redux - CurrentStageData", () => {
  const emptyStageData: EntityState<StageData> = {
    entities: {},
    ids: [],
  };

  const baseStageData: EntityState<StageData> = {
    entities: {
      [testItem.id]: {
        ...testItem,
      },
    },
    ids: [testItem.id],
  };

  test("should return EntityState<StageData> instance", () => {
    assertType<EntityState<StageData>>(reducer(undefined, { type: "unknown" }));
  });

  test("should return initial EntityState<StageData> instance", () => {
    const targetInitialStageData: EntityState<StageData> = emptyStageData;

    expect(reducer(undefined, { type: "unknown" })).toEqual(
      targetInitialStageData
    );
  });

  test("should add 1 item instance", () => {
    const prevStageData: EntityState<StageData> = emptyStageData;

    const targetStageData: EntityState<StageData> = baseStageData;

    const action = stageDataAction.addItem(testItem);

    expect(reducer(prevStageData, action)).toEqual(targetStageData);
  });

  test("should update 1 item instance", () => {
    const prevStageData: EntityState<StageData> = baseStageData;

    const targetStageData: EntityState<StageData> = {
      entities: {
        [testItem.id]: {
          ...testItem,
          attrs: {
            ...testItem.attrs,
            text: "수정된 이용방법",
          },
        },
      },
      ids: [testItem.id],
    };

    const action = stageDataAction.updateItem({
      ...testItem,
      attrs: {
        ...testItem.attrs,
        text: "수정된 이용방법",
      },
    });

    expect(reducer(prevStageData, action)).toEqual(targetStageData);
  });

  test("should remove 1 item instance", () => {
    const prevStageData: EntityState<StageData> = baseStageData;

    const targetStageData: EntityState<StageData> = emptyStageData;

    const action = stageDataAction.removeItem({
      id: testItem.id,
    });

    expect(reducer(prevStageData, action)).toEqual(targetStageData);
  });

  test("should clear all items", () => {
    const prevStageData: EntityState<StageData> = baseStageData;

    const targetStageData: EntityState<StageData> = emptyStageData;

    const action = stageDataAction.clearItems(null);

    expect(reducer(prevStageData, action)).toEqual(targetStageData);
  });
});
