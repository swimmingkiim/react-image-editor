import Konva from "konva";
import { useDispatch, useSelector } from "react-redux";
import { StageData, stageDataSelector } from "../redux/currentStageData";
import {
  stageDataListAction,
  StageDataListItem,
  stageDataListSelector,
} from "../redux/StageDataList";
import useItem from "./useItem";

export type TAB_CONTEXT = {
  selectedFileId: Konva.Node[];
  onCreate: (newFile: StageDataListItem) => void;
  onDelete: (targetFileId: StageDataListItem["id"]) => void;
  onUpdate: (StageDataListItem: StageDataListItem) => void;
};

export const STAGE_DATA_LIST_KEY = "koditorStageDataList";

const useStageDataList = () => {
  const dispatch = useDispatch();
  const stageDataList = useSelector(stageDataListSelector.selectAll);
  const stageData = useSelector(stageDataSelector.selectAll);
  const { alterItems, clearItems } = useItem();

  const initializeFileDataList = (dataList: StageDataListItem[]) => {
    dispatch(stageDataListAction.initialize(dataList));
    const lastFile = dataList[dataList.length - 1] ?? null;
    if (lastFile) {
      changeStageData(lastFile.id, lastFile.id, lastFile.data);
    }
  };

  const createFileData = (newFile: StageDataListItem) => {
    dispatch(stageDataListAction.addItem(newFile));
  };

  const updateFileData = (fileItem: StageDataListItem) => {
    //    const localDataList = getValue(STAGE_DATA_LIST_KEY) ?? {};
    //    setValue(STAGE_DATA_LIST_KEY, {
    //      ...localDataList,
    //      [fileItem.id]: {
    //        ...fileItem,
    //      },
    //    });

    dispatch(stageDataListAction.updateItem(fileItem));
  };

  const removeFileData = (targetFileId: StageDataListItem["id"]) => {
    //    const localDataList = getValue(STAGE_DATA_LIST_KEY) ?? {};
    //    delete localDataList[targetFileId];
    //    setValue(STAGE_DATA_LIST_KEY, {
    //      ...localDataList,
    //    });
    dispatch(stageDataListAction.removeItem(targetFileId));
  };

  const changeStageData = (
    prevFileId: string,
    nextFileId: string,
    targetStageData?: StageData[],
  ) => {
    if (prevFileId && prevFileId !== nextFileId) {
      updateFileData({ id: prevFileId, data: stageData });
    }
    clearItems();

    const newStageData = stageDataList.find((dataListItem) => dataListItem.id === nextFileId)?.data;
    if (targetStageData || newStageData) {
      alterItems((targetStageData ?? newStageData)!);
    }
  };

  return {
    stageDataList,
    initializeFileDataList,
    createFileData,
    updateFileData,
    removeFileData,
    changeStageData,
  };
};

export default useStageDataList;
