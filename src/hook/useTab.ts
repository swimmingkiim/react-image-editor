import React, { useState } from "react";
import { StageDataListItem } from "../redux/StageDataList";
import { TabKind } from "../tab/Tab";
import useLocalStorage from "./useLocalStorage";
import useSelection from "./useSelection";
import useStageDataList from "./useStageDataList";
import useTransformer from "./useTransformer";
import useWorkHistory from "./useWorkHistory";

export const TAB_ID = "tabId";

const useTab = (
  transformer: ReturnType<typeof useTransformer>,
  clearHistory: ReturnType<typeof useWorkHistory>["clearHistory"],
) => {
  const [tabList, setTabList] = useState<TabKind[]>([]);
  const { createFileData, removeFileData, changeStageData } = useStageDataList();
  const { clearSelection } = useSelection(transformer);
  const { setValue } = useLocalStorage();

  const onClickTab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentActiveFileId = e.currentTarget.dataset.fileId;
    const prevFileId = tabList.find((tab) => tab.active)?.id;
    clearSelection();

    changeStageData(prevFileId!, currentActiveFileId!);
    setTabList((prev) =>
      prev.map((file) => ({
        id: file.id,
        active: currentActiveFileId === file.id,
      })),
    );
    setValue(TAB_ID, { id: currentActiveFileId });
    clearHistory();
  };

  const moveTab = (tabId: string, fileItem?: StageDataListItem) => {
    const prevFileId = tabList.find((tab) => tab.active)?.id;
    clearSelection();

    changeStageData(prevFileId!, tabId!, fileItem?.data ?? undefined);
    setTabList((prev) =>
      prev.map((file) => ({
        id: file.id,
        active: tabId === file.id,
      })),
    );
    setValue(TAB_ID, { id: tabId });
    clearHistory();
  };

  const onCreateTab = (e?: React.SyntheticEvent, fileItem?: StageDataListItem) => {
    const newTabId
      = fileItem?.id
      ?? `file-${tabList.length === 0 ? 1 : parseInt(tabList[tabList.length - 1].id.slice(5)) + 1}`;
    const prevTabId = tabList.find((_tab) => _tab.active)?.id;
    clearSelection();
    createFileData(
      fileItem ?? {
        id: newTabId,
        data: [],
      },
    );
    changeStageData(prevTabId ?? newTabId, newTabId);
    setTabList((prev) => [
      ...Object.values(prev).map((tab, index) => ({
        ...tab,
        active: false,
      })),
      {
        id: newTabId,
        active: true,
      },
    ]);
    if (!fileItem) {
      setValue(TAB_ID, { id: newTabId });
      clearHistory();
    }
  };

  const onDeleteTab = (tabId: string) => {
    if (tabList.length <= 1) {
      return;
    }
    const currentTab = tabList.find((tab) => tab.active);
    const tabIndex = tabList.findIndex((tab) => tab.id === tabId);
    const nextTabId
      = tabList[tabIndex].id === currentTab!.id
        ? tabList[tabIndex === 0 ? tabIndex + 1 : tabIndex - 1].id
        : currentTab!.id;
    clearSelection();
    removeFileData(tabId);
    changeStageData(nextTabId, nextTabId);
    setTabList((prev) => [
      ...prev
        .filter((tab) => tab.id !== tabId)
        .map((tab) => {
          if (tab.id === nextTabId) {
            return {
              id: tab.id,
              active: true,
            };
          }
          return {
            id: tab.id,
            active: false,
          };
        }),
    ]);
    setValue(TAB_ID, { id: nextTabId });
    clearHistory();
  };

  return {
    tabList,
    onClickTab,
    onCreateTab,
    onDeleteTab,
    moveTab,
  };
};

export default useTab;
