import React, { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Transformer } from "react-konva";
import { Node, NodeConfig } from "konva/lib/Node";
import { useHotkeys } from "react-hotkeys-hook";
import { nanoid } from "nanoid";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Header from "./header";
import Footer from "./footer";
import Layout from "./layout";
import SettingBar, { SettingSideBar } from "./settingBar";
import TabGroup from "./tab";
import workModeList from "./config/workMode.json";
import NavBar from "./navBar";
import NavBarButton from "./navBar/NavBarButton";
import View from "./view";
import Frame, { FrameProps } from "./view/frame";
import { StageData } from "./redux/currentStageData";
import useItem from "./hook/useItem";
import { StageDataListItem } from "./redux/stageDataList";
import useStageDataList from "./hook/useStageDataList";
import ImageItem, { ImageItemProps } from "./view/object/image";
import useSelection from "./hook/useSelection";
import useTab from "./hook/useTab";
import useTransformer from "./hook/useTransformer";
import useStage from "./hook/useStage";
import useTool from "./hook/useTool";
import TextItem, { TextItemProps } from "./view/object/text";
import ShapeItem, { ShapeItemProps } from "./view/object/shape";
import IconItem, { IconItemProps } from "./view/object/icon";
import LineItem, { LineItemProps } from "./view/object/line";
import DecorationAreaItem, {
  DecorationAreaItemProps,
} from "./view/object/decoration";
import useModal from "./hook/useModal";
import hotkeyList from "./config/hotkey.json";
import cart from "./mock/cart.json";
import useHotkeyFunc from "./hook/useHotkeyFunc";
import useWorkHistory from "./hook/useWorkHistory";
import useI18n from "./hook/usei18n";
import { initialStageDataList } from "./redux/initilaStageDataList";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import LoadingModal from "./modal/loading";
import { NavItemKind, TabKind } from "./tab/Tab";
import ErrorModal from "./modal/error";
import { v4 as guid } from 'uuid';
import { useData } from "./data";
import { SubmenuType } from "./settingBar/sideBar";
import { EventName } from "./config/constants";
import useCompRect from "./hook/useComp/useCompRect";
import useEvent from "./hook/useEvent";
import CartView from "./cart";
import PrintAreaItem, { PrintAreaItemProps } from "./view/object/print";

const GET_CART = gql`
  query {
    getCart {
      uuid
      products {
        uuid
        product_name
        product_code
        image
        product_parts {
          image
          uuid
          priority
        }
      }
    }
  }
`;

export type FileKind = {
  "file-id": string;
  title: string;
  data: Record<string, any>[];
};

export type FileData = Record<string, FileKind>;

function App() {
  const [ navModelList, setNavModelList ] = useState(workModeList);
  const [ past, setPast ] = useState<StageData[][]>([]);
  const [ future, setFuture ] = useState<StageData[][]>([]);
  const [ settingBarKey ] = useState<string>(guid());
  const [ printArea, setPrintArea ] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [ activeMenu, setActiveMenu ] = useState<SubmenuType>(SubmenuType.Default);
  const [ settingBarRect, setSettingBarRect ] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [ mainEditorRect, setMainEditorRect ] = useState<{x: number, y: number, width: number, height: number} | null>(null);

  const { data, loading, error } = useQuery(GET_CART);
  const settingBarRef = useRef<HTMLDivElement | null>(null);
  const settingSideBarRef = useRef<HTMLDivElement | null>(null);

  const settingBarEvent = useCompRect(EventName.SETTING_BAR_EVENT);
  const { emit } = useEvent();

  const {
    makeProduct
  } = useData();

  const {
    goToFuture,
    goToPast,
    recordPast,
    clearHistory,
    getCurrentDefaultBackground,
  } = useWorkHistory(past, future, setPast, setFuture);
  const transformer = useTransformer();
  const { selectedItems, onSelectItem, setSelectedItems, clearSelection } =
    useSelection(transformer);
  const { tabList, onClickTab, onCreateTab, onDeleteTab, onInitTabs, onNavSelect } = useTab(
    transformer,
    clearHistory,
  );
  const { stageData, createItem } = useItem();
  const { initializeFileDataList, updateFileData } = useStageDataList();
  const stage = useStage();
  const modal = useModal();
  const {
    deleteItems,
    copyItems,
    selectAll,
    pasteItems,
    duplicateItems,
    layerDown,
    layerUp,
    flipHorizontally,
    flipVertically,
  } = useHotkeyFunc();
  const { getTranslation } = useI18n();
  const [clipboard, setClipboard] = useState<StageData[]>([]);
  const createStageDataObject = (item: Node<NodeConfig>): StageData => {
    const { id } = item.attrs;
    const target =
      item.attrs["data-item-type"] === "frame" ? item.getParent() : item;
    return {
      id: nanoid(),
      attrs: {
        ...(stageData.find((_item) => _item.attrs.id === id)?.attrs ?? {}),
      },
      className: target.getType(),
      children: [],
    };
  };
  const { getClickCallback } = useTool(
    stage,
    modal,
    selectedItems,
    setSelectedItems,
    transformer,
    createStageDataObject,
    onSelectItem,
  );

  const currentTabId = useMemo(
    () => tabList.find((tab) => tab.active)?.id ?? null,
    [tabList],
  );

  const sortedStageData = useMemo(
    () =>
      stageData.sort((a, b) => {
        if (a.attrs.zIndex === b.attrs.zIndex) {
          if (a.attrs.zIndex < 0) {
            return b.attrs.updatedAt - a.attrs.updatedAt;
          }
          return a.attrs.updatedAt - b.attrs.updatedAt;
        }
        return a.attrs.zIndex - b.attrs.zIndex;
      }),
    [stageData],
  );

  const onImageUpload = (data: StageData) => {
    // let newItem = {...data};
    // newItem.attrs.x = mainEditorRect.x;
    // newItem.attrs.y = mainEditorRect.y;
    createItem(data);
  };

  const onTextCreate = () => {
    createItem({
      id: nanoid(),
      attrs: {
        "data-item-type": "text",
        x: 0,
        y: 0,
        text: "Text",
        fontSize: 20,
        fontFamily: "Arial",
        fill: "black",
        draggable: true,
        zIndex: stageData.length,
      },
      className: "Text",
      children: [],
    });
  };

  const header = (
    <Header>
      <TabGroup
        onClickTab={onClickTab}
        tabList={tabList}
        onCreateTab={onCreateTab}
        onDeleteTab={onDeleteTab}
      />
    </Header>
  );

  const getNavItemName = (priority: number) => {
    switch (priority) {
      case 0:
        return "Font";
      case 1:
        return "Rare";
      case 2:
        return "Left Sleeve";
      case 3:
        return "Right Sleeve";
      default:
        return null;
    }
  };

  const footer = (
    // <Footer>
    //   <TabGroup
    //     onClickTab={(e, tab) => {
    //       onClickTab(e);
    //       const models = workModeList.map(o => {
    //         if(o.type === "middle"){
    //           return o;
    //         }
    //       });
          // const newModels = tab.parts.sort((a, b) => a.priority - b.priority).map((o:NavItemKind) => ({
          //   id: o.id,
          //   type: "top",
          //   name: getNavItemName(o.priority),
          //   desc: getNavItemName(o.priority),
          //   icon: o.img,
          // }));
          // setNavModelList(models.concat(newModels));
    //     }}
    //     tabList={tabList}
    //     onCreateTab={onCreateTab}
    //     onDeleteTab={onDeleteTab}
    //     isHeader={false}
    //   />
    // </Footer>
    <CartView items={tabList} onItemSelect={(e, tab) => {
      onClickTab(e);
      const models = workModeList.map(o => {
        if(o.type === "middle"){
          return o;
        }

        const newModels = tab.parts.sort((a, b) => a.priority - b.priority).map((o:NavItemKind) => ({
          id: o.id,
          type: "top",
          name: getNavItemName(o.priority),
          desc: getNavItemName(o.priority),
          icon: o.img,
        }));
        setNavModelList(models.concat(newModels));
      });
    }}/>
  );

  const onNavItemSelect = (index: number) => {
    const item = onNavSelect(index);
    
  };

  const navBar = (
    <NavBar items={navModelList} onClick={getClickCallback} onSelect={onNavItemSelect}></NavBar>
  );

  const hotkeyModal = (
    <Modal show={modal.displayModal} onHide={modal.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Keyboard Shortcut</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hotkeyList.map((hotkey) => (
          <Col key={hotkey.name}>
            <h6>{getTranslation("hotkey", hotkey.id, "name")}</h6>
            <Row className="justify-content-end" xs={4}>
              {hotkey.keys.map((key, idx) => (
                <React.Fragment key={hotkey.name + key}>
                  {idx !== 0 && "+"}
                  <Col xs="auto" className="align-items-center">
                    <Button disabled>{key}</Button>
                  </Col>
                </React.Fragment>
              ))}
            </Row>
          </Col>
        ))}
      </Modal.Body>
    </Modal>
  );

  const settingBar = (
    <SettingBar
      ref={settingBarRef}
      selectedItems={selectedItems}
      clearSelection={clearSelection}
      stageRef={stage.stageRef}
      onSubmenuClick={setActiveMenu}
      onImageUpload={onImageUpload}
      onTextCreate={onTextCreate}
    />
  );

  const subMenu = () => (
    <SettingSideBar ref={settingSideBarRef} menu={activeMenu}></SettingSideBar>
  );

  const renderObject = (data: StageData, printArea?:{x: number, y: number, width: number, height: number}) => {
    switch (data.attrs["data-item-type"]) {
      case "frame":
        return (
          <Frame
            key={`frame-${data.id}`}
            data={data as FrameProps["data"]}
            onSelect={onSelectItem}
          />
        );
      case "image":
        return (
          <ImageItem
            key={`image-${data.id}`}
            data={data as ImageItemProps["data"]}
            onSelect={onSelectItem}
            referenceRect={printArea}
          />
        );
      case "text":
        return (
          <TextItem
            key={`text-${data.id}`}
            data={data as TextItemProps["data"]}
            transformer={transformer}
            onSelect={onSelectItem}
            referenceRect={printArea}
          />
        );
      case "shape":
        return (
          <ShapeItem
            key={`shape-${data.id}`}
            data={data as ShapeItemProps["data"]}
            transformer={transformer}
            onSelect={onSelectItem}
          />
        );
      case "icon":
        return (
          <IconItem
            key={`icon-${data.id}`}
            data={data as IconItemProps["data"]}
            transformer={transformer}
            onSelect={onSelectItem}
          />
        );
      case "line":
        return (
          <LineItem
            key={`line-${data.id}`}
            data={data as LineItemProps["data"]}
            transformer={transformer}
            onSelect={onSelectItem}
          />
        );
      case "decoration":
        return (
          // <DecorationAreaItem
          //   key={`decoration-${data.id}`}
          //   data={data as DecorationAreaItemProps["data"]}
          //   transformer={transformer}
          //   onSelect={onSelectItem}
          //   getCurrentDefaultBackground={getCurrentDefaultBackground}
          // />
          <PrintAreaItem
            data={data as PrintAreaItemProps["data"]}
            onSelect={onSelectItem}
          />
        );
      default:
        return null;
    }
  };

  useHotkeys(
    "shift+up",
    (e) => {
      e.preventDefault();
      layerUp(selectedItems);
    },
    {},
    [selectedItems],
  );

  useHotkeys(
    "shift+down",
    (e) => {
      e.preventDefault();
      layerDown(selectedItems);
    },
    {},
    [selectedItems],
  );

  useHotkeys(
    "ctrl+d",
    (e) => {
      e.preventDefault();
      duplicateItems(selectedItems, createStageDataObject);
    },
    {},
    [selectedItems, stageData],
  );

  useHotkeys(
    "ctrl+c",
    (e) => {
      e.preventDefault();
      copyItems(selectedItems, setClipboard, createStageDataObject);
    },
    {},
    [selectedItems, stageData, clipboard],
  );

  useHotkeys(
    "ctrl+a",
    (e) => {
      e.preventDefault();
      selectAll(stage, onSelectItem);
    },
    {},
    [selectedItems],
  );

  useHotkeys(
    "ctrl+v",
    (e) => {
      e.preventDefault();
      pasteItems(clipboard);
    },
    {},
    [clipboard],
  );

  useHotkeys(
    "ctrl+z",
    (e) => {
      e.preventDefault();
      goToPast();
    },
    {},
    [goToPast],
  );

  useHotkeys(
    "ctrl+y",
    (e) => {
      e.preventDefault();
      goToFuture();
    },
    {},
    [goToFuture],
  );

  useHotkeys(
    "shift+h",
    (e) => {
      e.preventDefault();
      flipHorizontally(selectedItems);
    },
    {},
    [selectedItems],
  );

  useHotkeys(
    "shift+v",
    (e) => {
      e.preventDefault();
      flipVertically(selectedItems);
    },
    {},
    [selectedItems],
  );

  useHotkeys(
    "backspace",
    (e) => {
      e.preventDefault();
      deleteItems(selectedItems, setSelectedItems, transformer.transformerRef);
    },
    { enabled: Boolean(selectedItems.length) },
    [selectedItems, transformer.transformerRef.current],
  );

  useHotkeys(
    "delete",
    (e) => {
      e.preventDefault();
      deleteItems(selectedItems, setSelectedItems, transformer.transformerRef);
    },
    { enabled: Boolean(selectedItems.length) },
    [selectedItems, transformer.transformerRef.current],
  );

  settingBarEvent.onEvent((rect) => {
    setSettingBarRect(rect);
  });

  useEffect(() => {
    if (!cart.products || !settingBarRect) return;

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });

    const x = (window.innerWidth - settingBarRect.width)/4;
    const y = 0;
    const width = window.innerWidth - settingBarRect.width;
    const height = settingBarRect.height;
    setMainEditorRect({x, y, width, height});

    const {productList, productPartList} = makeProduct(cart.products, {
      originalPosition: {x: x, y: y},
      referenceWidth: width, 
      referenceHeight: height,
    });

    // onCreateTab(undefined, initialStageDataList[0] as StageDataListItem);
    setNavModelList(productList[0].parts.map(o => ({
      id: o.id,
      type: "top",
      active: o.active,
      name: o.name,
      desc: getNavItemName(o.priority),
      icon: o.img,
    })));
    onInitTabs(productList);
    initializeFileDataList(productPartList);
    stage.stageRef.current.setPosition({
      x: Math.max(Math.ceil(stage.stageRef.current.width() - (window.innerWidth - settingBarRect.width)) / 2, 0),
      y: 0,
    });
    stage.stageRef.current.setSize({width:window.innerWidth - settingBarRect.width, height: settingBarRect.height});
    console.log(`w=${stage.stageRef.current.width()};h=${stage.stageRef.current.height()}`);
    stage.stageRef.current.batchDraw();
  }, [cart.products, settingBarRect]);

  useEffect(() => {
    if (currentTabId) {
      updateFileData({
        id: currentTabId,
        data: stageData,
      });
    }

    const firstPrint = sortedStageData.find(o => o.attrs["data-item-type"] === "decoration");
    if(firstPrint){
      setPrintArea({
        x: firstPrint.attrs.x,
        y: firstPrint.attrs.y,
        width: firstPrint.attrs.width,
        height: firstPrint.attrs.height,
      });
    }

    recordPast(stageData);
  }, [stageData]);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if((settingBarRef.current && !settingBarRef.current.contains(e.target as any)) 
        && (settingSideBarRef.current && !settingSideBarRef.current.contains(e.target as any))){
        setActiveMenu(SubmenuType.Default);
        emit(EventName.CLIPART_BAR_OPEN_EVENT, false);
      }
    });
  }, [settingBarRef, settingSideBarRef]);

  // const showErrorModal = (show) => <ErrorModal show={show} error={error?.message}/>;

  return (
    <>
      <Layout settingBarKey={settingBarKey} footer={footer} navBar={navBar} settingBar={settingBar} subMenu={subMenu}>
        {/* {hotkeyModal} */}
        <View onSelect={onSelectItem} stage={stage}>
          {stageData.length
            ? sortedStageData.map((item, index) => renderObject(item, index !== 0 ? printArea : undefined))
            : null}
          <Transformer
            ref={transformer.transformerRef}
            keepRatio
            shouldOverdrawWholeArea
            boundBoxFunc={(_, newBox) => newBox}
            onTransformEnd={transformer.onTransformEnd}
          />
        </View>
      </Layout>
      <LoadingModal show={loading} />;
      {/* <ErrorModal show={data && (error !== undefined || error !== null)} error={error?.message}/> */}
    </>
  );
}

export default App;
