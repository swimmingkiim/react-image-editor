import { expect, test, describe, assertType } from "vitest";

import { EntityState } from "@reduxjs/toolkit";

import reducer, {
  StageDataListItem,
  stageDataListAction,
} from "../../src/redux/stageDataList";
import { initialStageDataList } from "../../src/redux/initilaStageDataList";

const testItem = {
  id: "12345",
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

describe("Test Redux - StageDataList", () => {
  const emptyStageDataList: EntityState<StageDataListItem> = {
    entities: {},
    ids: [],
  };

  const baseStageDataList: EntityState<StageDataListItem> = {
    entities: {
      [initialStageDataList[0].id]: initialStageDataList[0],
    },
    ids: [initialStageDataList[0].id],
  };

  test("should return EntityState<StageDataListItem> instance", () => {
    assertType<EntityState<StageDataListItem>>(
      reducer(undefined, { type: "unknown" })
    );
  });

  test("should return initial EntityState<StageData> instance", () => {
    const targetInitialStageDataList: EntityState<StageDataListItem> =
      emptyStageDataList;

    expect(reducer(undefined, { type: "unknown" })).toEqual(
      targetInitialStageDataList
    );
  });

  test("should add 1 StageDataListItem instance", () => {
    const prevStageDataList: EntityState<StageDataListItem> =
      emptyStageDataList;

    const targetStageDataList: EntityState<StageDataListItem> =
      baseStageDataList;

    const action = stageDataListAction.addItem(initialStageDataList);

    expect(reducer(prevStageDataList, action)).toEqual(targetStageDataList);
  });

  test("should update 1 item instance", () => {
    const prevStageDataList: EntityState<StageDataListItem> = baseStageDataList;

    const targetStageDataList: EntityState<StageDataListItem> = {
      entities: {
        [initialStageDataList[0].id]: {
          ...initialStageDataList[0],
          data: [...initialStageDataList[0].data, testItem],
        },
      },
      ids: [initialStageDataList[0].id],
    };

    const action = stageDataListAction.updateItem({
      ...initialStageDataList[0],
      data: [...initialStageDataList[0].data, testItem],
    });

    expect(reducer(prevStageDataList, action)).toEqual(targetStageDataList);
  });

  test("should remove 1 item instance", () => {
    const prevStageDataList: EntityState<StageDataListItem> = baseStageDataList;

    const targetStageDataList: EntityState<StageDataListItem> =
      emptyStageDataList;

    const action = stageDataListAction.removeItem({
      id: initialStageDataList[0].id,
    });

    expect(reducer(prevStageDataList, action)).toEqual(targetStageDataList);
  });
});
