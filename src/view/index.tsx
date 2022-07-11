import React, { useCallback, useEffect, useState } from "react";
import Konva from "konva";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { useHotkeys } from "react-hotkeys-hook";
import { IRect, Vector2d } from "konva/lib/types";
import { Provider, ReactReduxContext } from "react-redux";
import { Layer, Rect, Stage } from "react-konva";
import { decimalUpToSeven } from "../util/decimalUpToSeven";
import Drop from "../util/Drop";
import positionStyles from "../style/position.module.css";
import { ITEMS_CONTEXT } from "../hook/useItem";
import useDragAndDrop from "../hook/useDragAndDrop";
import useStage, { STAGE_POSITION, STAGE_SCALE } from "../hook/useStage";
import useLocalStorage from "../hook/useLocalStorage";

type ViewProps = {
  onSelect: ITEMS_CONTEXT["onSelect"];
  stage: ReturnType<typeof useStage>;
  children: React.ReactNode;
};

const View: React.FC<ViewProps> = ({
  children,
  onSelect,
  stage: { stageRef, dragBackgroundOrigin },
}) => {
  const { onDropOnStage } = useDragAndDrop(stageRef, dragBackgroundOrigin);
  const [container, setContainer] = useState<HTMLDivElement>();
  const { setValue } = useLocalStorage();

  const setStateSizeToFitIn = useCallback(() => {
    if (!stageRef.current || !stageRef.current.container().parentElement) {
      return;
    }
    const { width, height } = stageRef.current.container().parentElement!.getBoundingClientRect();
    stageRef.current.width(width);
    stageRef.current.height(height);
    stageRef.current.batchDraw();
  }, [stageRef]);

  const zoomOnWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    const zoomDirection = e.evt.deltaY > 0 ? 1 : -1;
    const scaleBy = 1.1;
    const oldScale = stage.scaleX();

    const pointer = stage.getPointerPosition();

    if (!pointer) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = zoomDirection > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });
    setValue(STAGE_SCALE, { x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    setValue(STAGE_POSITION, newPos);
  }, []);

  const resetZoom = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    setValue(STAGE_POSITION, { x: 0, y: 0 });
    setValue(STAGE_SCALE, { x: 1, y: 1 });
  }, []);

  const moveStage = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || !stage.container().parentElement || !dragBackgroundOrigin.current) {
      return;
    }
    stage.on("mousemove", (e) => {
      if (e.evt.which !== 1) {
        return;
      }
      const currentMousePos = stage.getPointerPosition();
      if (!currentMousePos) {
        return;
      }
      if (dragBackgroundOrigin.current.x === 0 && dragBackgroundOrigin.current.y === 0) {
        dragBackgroundOrigin.current = currentMousePos!;
        return;
      }
      const newPos = {
        x: decimalUpToSeven(stage.x() + (currentMousePos!.x - dragBackgroundOrigin.current.x)),
        y: decimalUpToSeven(stage.y() + (currentMousePos!.y - dragBackgroundOrigin.current.y)),
      };
      stage.position(newPos);
      setValue(STAGE_POSITION, newPos);
      dragBackgroundOrigin.current = currentMousePos!;
    });
    stage.on("mouseup", (e) => {
      dragBackgroundOrigin.current = { x: 0, y: 0 };
      if (!stageRef.current?.draggable()) {
        stage.removeEventListener("mousemove");
        stage.removeEventListener("mouseup");
      }
    });
    stageRef.current?.draggable(true);
  }, []);

  const onSelectEmptyBackground = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      e.target.getType() === "Stage" && onSelect(e);
    },
    [onSelect],
  );

  const onMouseDownOnStage = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      onSelectEmptyBackground(e);
      const stage = e.target.getStage();
      if (!stage) {
        return;
      }
      const selectBox = stage.findOne(".select-box");
      const scaledCurrentMousePos = getScaledMousePosition(stage, e.evt);
      const currentMousePos = stage.getPointerPosition();
      selectBox.position(scaledCurrentMousePos);
      if (stage.getAllIntersections(currentMousePos).length || stageRef.current?.draggable()) {
        selectBox.visible(false);
        return;
      }
      selectBox.visible(true);
    },
    [onSelectEmptyBackground],
  );

  const onMouseMoveOnStage = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.which === 1) {
      const stage = e.target.getStage();
      if (!stage) {
        return;
      }
      const selectBox = stage.findOne(".select-box");
      if (!selectBox.visible()) {
        return;
      }
      const currentMousePos = getScaledMousePosition(stage, e.evt);
      const origin = selectBox.position();
      const size = selectBox.size();
      const adjustedRectInfo = getOriginFromTwoPoint(origin, currentMousePos, size);
      selectBox.position({
        x: adjustedRectInfo.x,
        y: adjustedRectInfo.y,
      });
      selectBox.size({
        width: adjustedRectInfo.width,
        height: adjustedRectInfo.height,
      });
      selectBox.getStage()?.batchDraw();
    }
  };

  const onMouseUpOnStage = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (!stage) {
        return;
      }
      const selectBox = stage.findOne(".select-box");
      const overlapItems: Node<NodeConfig>[] = getItemsInBoundary(stage, selectBox)
        ? getItemsInBoundary(stage, selectBox)!
          .map((_item) =>
            _item.attrs["data-item-type"] === "frame"
              ? _item.getParent().getChildren() ?? []
              : _item,
          )
          .flat()
          .filter((_item) => _item.className !== "Label")
        : [];

      selectBox.visible(false);
      selectBox.position({
        x: 0,
        y: 0,
      });
      selectBox.size({
        width: 0,
        height: 0,
      });
      selectBox.getLayer()?.batchDraw();
      overlapItems?.length && onSelect(undefined, overlapItems);
    },
    [onSelect],
  );

  useHotkeys(
    "space",
    (e) => {
      moveStage();
    },
    { keydown: true, enabled: !stageRef.current?.draggable() },
    [stageRef.current, moveStage],
  );

  useHotkeys(
    "space",
    (e) => {
      stageRef.current?.draggable(false);
      stageRef.current?.fire("mouseup");
    },
    { keyup: true },
    [stageRef.current, moveStage],
  );

  useHotkeys(
    "ctrl+0",
    (e) => {
      resetZoom();
    },
    {},
    [stageRef.current, resetZoom],
  );

  useEffect(() => {
    window.addEventListener("load", setStateSizeToFitIn);
    window.addEventListener("resize", setStateSizeToFitIn);
    return () => window.removeEventListener("resize", setStateSizeToFitIn);
  }, [setStateSizeToFitIn]);

  useEffect(() => {
    if (stageRef.current) {
      setContainer(stageRef.current!.container());
    }
  }, []);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage
          ref={stageRef}
          width={window.innerWidth * 0.8}
          height={window.innerHeight * 0.8}
          draggable={false}
          onWheel={zoomOnWheel}
          onMouseDown={onMouseDownOnStage}
          onMouseMove={onMouseMoveOnStage}
          onMouseUp={onMouseUpOnStage}
          className={[positionStyles.absolute, positionStyles.top0, positionStyles.left0].join(
            " ",
          )}>
          <Provider store={store}>
            <Layer>
              {children}
              <Rect
                name="select-box"
                x={0}
                y={0}
                width={0}
                height={0}
                fill="skyblue"
                opacity={0.4}
                visible={false}
              />
            </Layer>
            {container ? <Drop callback={onDropOnStage} targetDOMElement={container} /> : null}
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default View;

export const getScaledMousePosition = (stage: Konva.Stage, e: DragEvent | MouseEvent) => {
  stage.setPointersPositions(e);
  const stageOrigin = stage.getAbsolutePosition();
  const mousePosition = stage.getPointerPosition();
  if (mousePosition) {
    return {
      x: decimalUpToSeven((mousePosition.x - stageOrigin.x) / stage.scaleX()),
      y: decimalUpToSeven((mousePosition.y - stageOrigin.y) / stage.scaleY()),
    };
  }
  return {
    x: 0,
    y: 0,
  };
};

export const getItemsInBoundary = (stage: Konva.Stage, targetItem: Konva.Node) => {
  const boundary = targetItem.getClientRect({ relativeTo: stage.getLayer() });
  const result = targetItem
    .getLayer()
    ?.getChildren((item: Konva.Node) => {
      if (item.name() === "select-box") {
        return false;
      }
      const itemBoundary = item.getClientRect({ relativeTo: stage.getLayer() });
      return (
        boundary.x <= itemBoundary.x
        && boundary.y <= itemBoundary.y
        && boundary.x + boundary.width >= itemBoundary.x + itemBoundary.width
        && boundary.y + boundary.height >= itemBoundary.y + itemBoundary.height
      );
    })
    .map((item) => {
      if (item.name() === "label-group") {
        return (item as Konva.Group).findOne(".label-target") ?? null;
      }
      return item;
    })
    .filter(Boolean);
  return result;
};

export const getOriginFromTwoPoint = (
  p1: Vector2d,
  p2: Vector2d,
  size: { width: number; height: number },
): IRect => {
  const result: IRect = {
    x: p1.x,
    y: p1.y,
    width: size.width,
    height: size.height,
  };
  result.x = p1.x;
  result.y = p1.y;
  result.width = p2.x - p1.x;
  result.height = p2.y - p1.y;
  return result;
};
