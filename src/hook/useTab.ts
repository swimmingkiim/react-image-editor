import React, { useState } from "react";
import { StageDataListItem } from "../redux/stageDataList";
import Tab, { NavItemKind, TabKind } from "../tab/Tab";
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
  const [ tabList, setTabList ] = useState<TabKind[]>([]);
  const { createFileData, removeFileData, changeStageData } =
    useStageDataList();
  const { clearSelection } = useSelection(transformer);
  const { setValue } = useLocalStorage();

  const onClickTab = (e: React.MouseEvent<HTMLAnchorElement|HTMLElement, MouseEvent>) => {
    const currentActiveFileId = e.currentTarget.dataset.fileId;
    const prevFileId = tabList.find((tab) => tab.active)?.id;
    clearSelection();

    changeStageData(prevFileId!, currentActiveFileId!);
    setTabList((prev) =>
      prev.map((file) => ({
        id: file.id,
        active: currentActiveFileId === file.id,
        name: file.name,
        preview: file.preview ? file.preview : undefined,
        parts: file.parts,
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
        name: file.name,
        preview: file.preview ?? undefined,
        parts: file.parts,
      })),
    );
    setValue(TAB_ID, { id: tabId });
    clearHistory();
  };

  const onInitTabs = (tabs:TabKind[]) => {
    setTabList(tabs);
  };

  const onCreateTab = (
    preview?: string,
    e?: React.SyntheticEvent,
    fileItem?: StageDataListItem,
  ) => {
    const newTabId =
      fileItem?.id ??
      `file-${tabList.length === 0 ? 1 : parseInt(tabList[tabList.length - 1].id.slice(5)) + 1}`;
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
      ...Object.values(prev).map(tab => ({
        ...tab,
        active: false,
        name: tab.name,
        parts: tab.parts,
      })),
      {
        id: newTabId,
        active: true,
        preview: preview ?? undefined,
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
    const nextTabId =
      tabList[tabIndex].id === currentTab!.id
        ? tabList[tabIndex === 0 ? tabIndex + 1 : tabIndex - 1].id
        : currentTab!.id;
    clearSelection();
    removeFileData(tabId);
    changeStageData(nextTabId, nextTabId);
    setTabList((prev) => [
      ...prev
        .filter((tab) => tab.id !== tabId)
        .map((tab) => {
          return {
            id: tab.id,
            active: tab.id === nextTabId,
            name: tab.name,
            preview: tab.preview ?? undefined,
            parts: tab.parts,
          };
        }),
    ]);
    setValue(TAB_ID, { id: nextTabId });
    clearHistory();
  };

  const onNavSelect = (index: number):NavItemKind => {
    const currentTab = tabList.find((tab) => tab.active);
    currentTab.parts = currentTab.parts.map((o, i) => {
      return {
        ...o,
        active:i == index,
      }
    });
    return currentTab.parts.find(o => o.active);
  };

  return {
    tabList,
    onClickTab,
    onCreateTab,
    onInitTabs,
    onDeleteTab,
    onNavSelect,
    moveTab,
  };
};

export default useTab;
