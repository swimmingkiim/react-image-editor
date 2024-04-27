import { expect, test, describe, assertType } from "vitest";

import reducer, {
  ImageAssetListItem,
  imageAssetListAction,
} from "../../src/redux/imageAssetList";
import { EntityState } from "@reduxjs/toolkit";

describe("Test Redux - ImageAssetList", () => {
  test("should return EntityState<ImageAssetList> instance", () => {
    assertType<EntityState<ImageAssetListItem>>(
      reducer(undefined, { type: "unknown" })
    );
  });

  test("should return initial Entity<ImageAssetList> instance", () => {
    const targetInitialImageAssetList: EntityState<ImageAssetListItem> = {
      entities: {},
      ids: [],
    };

    expect(reducer(undefined, { type: "unknown" })).toEqual(
      targetInitialImageAssetList
    );
  });

  test("should add 1 ImageAssetListItem instance", () => {
    const prevImageAssetList: EntityState<ImageAssetListItem> = {
      entities: {},
      ids: [],
    };

    const targetImageAssetList: EntityState<ImageAssetListItem> = {
      entities: {
        "1234": {
          type: "image-type",
          id: "1234",
          name: "dummy-image",
          src: "abcdefg",
        },
      },
      ids: ["1234"],
    };

    const action = imageAssetListAction.addItem({
      type: "image-type",
      id: "1234",
      name: "dummy-image",
      src: "abcdefg",
    });

    expect(reducer(prevImageAssetList, action)).toEqual(targetImageAssetList);
  });

  test("should update 1 ImageAssetListItem instance", () => {
    const prevImageAssetList: EntityState<ImageAssetListItem> = {
      entities: {
        "1234": {
          type: "image-type",
          id: "1234",
          name: "dummy-image",
          src: "abcdefg",
        },
      },
      ids: ["1234"],
    };

    const targetImageAssetList: EntityState<ImageAssetListItem> = {
      entities: {
        "1234": {
          type: "image-type",
          id: "1234",
          name: "dummy-image",
          src: "abcdefghigklmnop",
        },
      },
      ids: ["1234"],
    };

    const action = imageAssetListAction.updateItem({
      type: "image-type",
      id: "1234",
      name: "dummy-image",
      src: "abcdefghigklmnop",
    });

    expect(reducer(prevImageAssetList, action)).toEqual(targetImageAssetList);
  });

  test("should remove 1 ImageAssetListItem instance", () => {
    const prevImageAssetList: EntityState<ImageAssetListItem> = {
      entities: {
        "1234": {
          type: "image-type",
          id: "1234",
          name: "dummy-image",
          src: "abcdefg",
        },
      },
      ids: ["1234"],
    };

    const targetImageAssetList: EntityState<ImageAssetListItem> = {
      entities: {},
      ids: [],
    };

    const action = imageAssetListAction.removeItem({
      id: "1234",
    });

    expect(reducer(prevImageAssetList, action)).toEqual(targetImageAssetList);
  });
});
