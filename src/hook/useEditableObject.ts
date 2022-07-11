import { KonvaEventObject } from "konva/lib/Node";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StageData, stageDataAction, stageDataSelector } from "../redux/currentStageData";
import { decimalUpToSeven } from "../util/decimalUpToSeven";

export type useEditableObjectProps = {
  _id: string;
};

const useEditableObject = ({ _id }: useEditableObjectProps) => {
  const dispatch = useDispatch();
  const stageData = useSelector(stageDataSelector.selectAll);
  const [id, setId] = useState<string>(_id);
  const [color, setColor] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [rotation, setRotation] = useState(0);

  const update = useCallback(() => {
    if (id === null) {
      if (process.env.NODE_ENV === "development") {
        console.error("id is null in useEditableObject");
      }
      return;
    }
    const targetItem = stageData.find((data) => data.id === id);
    const updatedObject = {
      ...(targetItem ?? {}),
      attrs: {
        color,
        background,
        ...position,
        ...size,
        rotation,
      },
    } as StageData;
    dispatch(stageDataAction.updateItem(updatedObject));
  }, [id, color, background, position, size, rotation, dispatch, stageData]);

  return {
    getObject: useCallback(
      () => ({
        color,
        background,
        position,
        size,
        rotation,
      }),
      [color, background, position, size, rotation],
    ),
    changeColor: useCallback((colorCode: string) => setColor(colorCode), []),
    changeBackgroundColor: useCallback((colorCode: string) => setBackground(colorCode), []),
    changePosition: useCallback((x?: number, y?: number) => {
      setPosition((prev) => ({
        x: x ? decimalUpToSeven(x) : prev.x,
        y: y ? decimalUpToSeven(y) : prev.y,
      }));
      update();
    }, []),
    changeSize: useCallback(
      (width?: number, height?: number) =>
        setSize((prev) => ({
          width: width ?? prev.width,
          height: height ?? prev.height,
        })),
      [],
    ),
    changeRotation: useCallback((deg: number) => setRotation(deg), []),
    onDragStart: useCallback((e: KonvaEventObject<Event>) => {
      return;
    }, []),
    onDragMove: useCallback((e: KonvaEventObject<Event>) => {
      return;
    }, []),
    onDragEnd: useCallback((e: KonvaEventObject<Event>) => {
      return;
    }, []),
  };
};
export default useEditableObject;
