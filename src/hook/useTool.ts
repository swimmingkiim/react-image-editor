import { Node, NodeConfig } from "konva/lib/Node";
import { StageData } from "../redux/currentStageData";
import useHotkeyFunc from "./useHotkeyFunc";
import useItem from "./useItem";
import useModal from "./useModal";
import useRemoveImageBackground from "./useRemoveImageBackground";
import useSelection from "./useSelection";
import useStage from "./useStage";
import useTransformer from "./useTransformer";

const useTool = (
  stage: ReturnType<typeof useStage>,
  modal: ReturnType<typeof useModal>,
  selectedItems: ReturnType<typeof useSelection>["selectedItems"],
  setSelectedItems: ReturnType<typeof useSelection>["setSelectedItems"],
  transformer: ReturnType<typeof useTransformer>,
  createStageDataObject: (item: Node<NodeConfig>) => StageData,
  onSelectItem: ReturnType<typeof useSelection>["onSelectItem"],
) => {
  const { updateItem } = useItem();
  const hotkeyFunc = useHotkeyFunc();
  const { autoRemoveBackground } = useRemoveImageBackground();
  const onClickHotkeyButton = () => {
    modal.openModal();
  };

  const removeBackground = (selectedItems: ReturnType<typeof useSelection>["selectedItems"]) => {
    if (selectedItems.length === 1 && selectedItems[0].attrs["data-item-type"] === "image") {
      console.log("in");
      const originalImage = new Image();
      originalImage.onload = () => {
        console.log("load");
        originalImage.width = attrs.width;
        originalImage.height = attrs.height;
        autoRemoveBackground(originalImage).then((base64: string) => {
          updateItem(selectedItems[0].id(), (attrs) => ({
            ...attrs,
            src: base64,
          }));
        });
      };
      const { attrs } = selectedItems[0];
      const source = attrs.image.src;
      originalImage.src = source;
    }
  };

  const getClickCallback = (id: string) => () => {
    console.log(id);
    switch (id) {
      case "select-all":
        return hotkeyFunc.selectAll(stage, onSelectItem);
      case "flip-horizontally":
        return hotkeyFunc.flipHorizontally(selectedItems);
      case "flip-vertically":
        return hotkeyFunc.flipVertically(selectedItems);
      case "layer-up":
        return hotkeyFunc.layerUp(selectedItems);
      case "layer-down":
        return hotkeyFunc.layerDown(selectedItems);
      case "zoom-in":
        return hotkeyFunc.zoom(stage, 1);
      case "zoom-out":
        return hotkeyFunc.zoom(stage, -1);
      case "reset-zoom":
        return hotkeyFunc.resetZoom(stage);
      case "remove-background":
        return removeBackground(selectedItems);
      case "hotkey":
        return onClickHotkeyButton();
      default:
        return null;
    }
  };

  return {
    onClickHotkeyButton,
    getClickCallback,
  };
};

export default useTool;
