import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useDispatch, useSelector } from "react-redux";
import { StageData, stageDataAction, stageDataSelector } from "../redux/currentStageData";

export type ItemData = {
  "data-item-type": string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  draggable: boolean;
} & Record<string, any>;

export type ItemProps = {
  key: string;
  data: ItemData;
  e?: Event;
} & Record<string, any>;

export type OverrideItemProps<T> = Omit<ItemProps, keyof T> & T & Pick<ITEMS_CONTEXT, "onSelect">;

export type OverrideItemData<T> = Omit<ItemData, keyof T> & T;

export type ITEMS_CONTEXT = {
  selectedItems: Konva.Node[];
  onCreate: (newItem: StageData) => void;
  onDelete: (targetItemId: string | string[]) => void;
  onSelect: (e?: KonvaEventObject<MouseEvent>, itemList?: Konva.Node[]) => void;
  onClear: () => void;
  onAlter: (dataList: StageData[]) => void;
};

const useItem = () => {
  const dispatch = useDispatch();
  const stageData = useSelector(stageDataSelector.selectAll);

  const createItem = (newItem: StageData) => {
    dispatch(stageDataAction.addItem(newItem));
  };

  const updateItem = (id: string, attrsFunc: (attrs: StageData["attrs"]) => StageData["attrs"]) => {
    const targetItem = stageData.find((data) => data.id === id || data.attrs.id === id);

    const updatedObject = {
      ...(targetItem ?? {}),
      attrs: {
        ...(targetItem ? targetItem.attrs : {}),
        ...attrsFunc(targetItem),
      },
    } as StageData;
    dispatch(stageDataAction.updateItem(updatedObject));
  };

  const removeItem = (targetItemId: string | string[]) => {
    dispatch(stageDataAction.removeItem(targetItemId));
  };
  const alterItems = (dataList: StageData[]) => {
    dispatch(stageDataAction.clearItems({}));
    dispatch(stageDataAction.addItem(dataList));
  };
  const clearItems = () => {
    dispatch(stageDataAction.clearItems({}));
  };

  return {
    stageData,
    createItem,
    updateItem,
    removeItem,
    alterItems,
    clearItems,
  };
};

export default useItem;
