import { Group } from "konva/lib/Group";
import { Node, NodeConfig } from "konva/lib/Node";
import { nanoid } from "nanoid";
import React from "react";
import { StageData } from "../redux/currentStageData";
import useItem from "./useItem";
import useLocalStorage from "./useLocalStorage";
import useSelection from "./useSelection";
import useStage, { STAGE_POSITION, STAGE_SCALE } from "./useStage";
import useTransformer from "./useTransformer";

const useHotkeyFunc = () => {
  const { removeItem, createItem, updateItem } = useItem();
  const { setValue } = useLocalStorage();

  const selectAll = (
    stage: ReturnType<typeof useStage>,
    onSelectItem: ReturnType<typeof useSelection>["onSelectItem"],
  ) => {
    const frameGroups = stage.stageRef.current
      .getChildren()[0]
      .getChildren((_item) => _item.attrs.name === "label-group")
      .map((_item) => [...((_item as Group).children ?? [])])
      .flat();
    const items = stage.stageRef.current
      .getChildren()[0]
      .getChildren(
        (_item) => _item.attrs.name === "label-target" && _item.attrs["data-item-type"] !== "frame",
      );
    const newSelections = [...frameGroups, ...items];
    onSelectItem(undefined, newSelections);
  };

  const copyItems = (
    selectedItems: Node<NodeConfig>[],
    setClipboard: (value: React.SetStateAction<StageData[]>) => void,
    createStageDataObject: (item: Node<NodeConfig>) => StageData,
  ) => {
    const newClips = selectedItems
      .map((item) => createStageDataObject(item))
      .sort((a, b) => {
        if (a.attrs.zIndex === b.attrs.zIndex) {
          if (a.attrs.zIndex < 0) {
            return b.attrs.updatedAt - a.attrs.updatedAt;
          }
          return a.attrs.updatedAt - b.attrs.updatedAt;
        }
        return a.attrs.zIndex - b.attrs.zIndex;
      });

    setClipboard(newClips);
  };

  const pasteItems = (clipboard: StageData[]) => {
    clipboard.forEach((item) => {
      if (Object.keys(item.attrs).length === 0) {
        return;
      }
      createItem({
        id: nanoid(),
        attrs: {
          ...item.attrs,
        },
        className: item.className,
        children: item.children,
      });
    });
  };

  const duplicateItems = (
    selectedItems: Node<NodeConfig>[],
    createStageDataObject: (item: Node<NodeConfig>) => StageData,
  ) => {
    selectedItems
      .map((item) => createStageDataObject(item))
      .sort((a, b) => {
        if (a.attrs.zIndex === b.attrs.zIndex) {
          if (a.attrs.zIndex < 0) {
            return b.attrs.updatedAt - a.attrs.updatedAt;
          }
          return a.attrs.updatedAt - b.attrs.updatedAt;
        }
        return a.attrs.zIndex - b.attrs.zIndex;
      })
      .forEach((item) => {
        createItem({
          ...item,
          attrs: {
            ...item.attrs,
            x: item.attrs.x + selectedItems[0].scaleX() * 50,
            y: item.attrs.y + selectedItems[0].scaleY() * 50,
          },
        });
      });
    if (selectedItems.length > 0) {
      selectedItems[0].getStage()?.batchDraw();
    }
  };

  const deleteItems = (
    selectedItems: Node<NodeConfig>[],
    setSelectedItems: (value: React.SetStateAction<Node<NodeConfig>[]>) => void,
    transformerRef: ReturnType<typeof useTransformer>["transformerRef"],
  ) => {
    setSelectedItems([]);
    transformerRef.current?.nodes([]);
    removeItem(selectedItems.map((item) => item.id()));
  };

  const layerUp = (selectedItems: Node<NodeConfig>[]) => {
    selectedItems.forEach((item) => {
      item.moveUp();
      updateItem(item.id(), (prevData) => ({
        ...item.attrs,
        zIndex: 1,
        updatedAt: Date.now(),
      }));
    });
  };

  const layerDown = (selectedItems: Node<NodeConfig>[]) => {
    selectedItems.forEach((item) => {
      item.moveDown();

      updateItem(item.id(), (prevData) => ({
        ...item.attrs,
        zIndex: -1,
        updatedAt: Date.now(),
      }));
    });
  };

  const flipHorizontally = (selectedItems: Node<NodeConfig>[]) => {
    selectedItems.forEach((item) => {
      item.scaleX(-1 * item.scaleX());
      updateItem(item.id(), (prevData) => ({
        ...item.attrs,
        scaleX: item.scaleX(),
        updatedAt: Date.now(),
      }));
    });
  };

  const flipVertically = (selectedItems: Node<NodeConfig>[]) => {
    selectedItems.forEach((item) => {
      item.scaleY(-1 * item.scaleY());
      updateItem(item.id(), (prevData) => ({
        ...item.attrs,
        scaleY: item.scaleY(),
        updatedAt: Date.now(),
      }));
    });
  };

  const resetZoom = (stage: ReturnType<typeof useStage>) => {
    stage.stageRef.current.scale({ x: 1, y: 1 });
    stage.stageRef.current.position({ x: 0, y: 0 });
    setValue(STAGE_POSITION, { x: 0, y: 0 });
    setValue(STAGE_SCALE, { x: 1, y: 1 });
  };

  const zoom = (stage: ReturnType<typeof useStage>, zoomDirection: 1 | -1) => {
    const stageRef = stage.stageRef.current;
    const scaleBy = 1.1;
    const oldScale = stageRef.scaleX();

    const pointer = stageRef.getPointerPosition();

    if (!pointer) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - stageRef.x()) / oldScale,
      y: (pointer.y - stageRef.y()) / oldScale,
    };

    const newScale = zoomDirection > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stageRef.scale({ x: newScale, y: newScale });
    setValue(STAGE_SCALE, { x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stageRef.position(newPos);
    setValue(STAGE_POSITION, newPos);
  };

  const undo = () => {
    // workHistory.goToPast();
  };

  const redo = () => {
    // workHistory.goToFuture();
  };

  return {
    pasteItems,
    selectAll,
    copyItems,
    deleteItems,
    duplicateItems,
    layerUp,
    layerDown,
    flipHorizontally,
    flipVertically,
    zoom,
    resetZoom,
    undo,
    redo,
  };
};

export default useHotkeyFunc;
