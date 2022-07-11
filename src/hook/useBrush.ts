import { KonvaEventObject } from "konva/lib/Node";
import React, { MutableRefObject, useRef, useState } from "react";

const useBrush = (
  image: HTMLImageElement,
  setImageSrc: (src: string) => void,
  width: number,
  height: number,
) => {
  // const image = useRef(new Image()) as MutableRefObject<HTMLImageElement>;
  const originalImage = useRef(new Image()) as MutableRefObject<HTMLImageElement>;
  const canvas = useRef(document.createElement("canvas")) as MutableRefObject<HTMLCanvasElement>;
  const originalCanvas = useRef(
    document.createElement("canvas"),
  ) as MutableRefObject<HTMLCanvasElement>;
  const [mode, setMode] = useState("remove by color");
  const brushSize = 20;
  let circle = new Path2D();
  const selectColorData = [19, 163, 188];
  const removeColorData = [255, 255, 255, 0];
  const canvasOffset = {
    x: canvas.current.getBoundingClientRect().left,
    y: canvas.current.getBoundingClientRect().top,
  };
  // circle.stroke = `rgb(${selectColorData.join(",")})`;

  // const setImage = () => {
  //   const _image = new Image();
  //   _image.onload = () => {
  //     image = _image.cloneNode() as HTMLImageElement;
  //     image.width = width;
  //     image.height = height;
  //   };
  //   _image.crossOrigin = "anonymous";
  //   _image.src = imageSrc;
  // };

  const isInColorRange = (
    targetColor: Uint8ClampedArray,
    compareTo: Uint8ClampedArray,
    i: number,
  ) =>
    targetColor[i] >= compareTo[0] - 10
    && targetColor[i] <= compareTo[0] + 10
    && targetColor[i + 1] >= compareTo[1] - 10
    && targetColor[i + 1] <= compareTo[1] + 10
    && targetColor[i + 2] >= compareTo[2] - 10
    && targetColor[i + 2] <= compareTo[2] + 10;

  const isInSpaceRange = (
    image: HTMLImageElement,
    i: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ) =>
    i >= y - width - image.width * height
    && i <= y + width + image.width * height
    && i % (image.width * 4) >= x - width
    && i % (image.width * 4) <= x + width;

  const selectColor = (
    colorData: Uint8ClampedArray,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const canvasData = canvas.current
      .getContext("2d")!
      .getImageData(0, 0, canvas.current.width, canvas.current.height);
    const pix = canvasData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
      if (isInColorRange(pix, colorData, i)) {
        pix[i] = selectColorData[0];
        pix[i + 1] = selectColorData[1];
        pix[i + 2] = selectColorData[2];
      }
    }
    canvas.current.getContext("2d")!.putImageData(canvasData, 0, 0);
  };

  const selectArea = (x: number, y: number, width: number, height: number) => {
    canvas.current.getContext("2d")!.clearRect(0, 0, image.width, image.height);
    canvas.current.getContext("2d")!.drawImage(image, 0, 0, image.width, image.height);
    circle = new Path2D();
    circle.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    canvas.current.getContext("2d")!.stroke(circle);
  };

  const removeColor = (
    colorData: Uint8ClampedArray,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const canvasData = canvas.current
      .getContext("2d")!
      .getImageData(0, 0, canvas.current.width, canvas.current.height);
    const pix = canvasData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
      if (isInColorRange(pix, colorData, i)) {
        pix[i] = removeColorData[0];
        pix[i + 1] = removeColorData[1];
        pix[i + 2] = removeColorData[2];
        pix[i + 3] = removeColorData[3];
      }
    }
    canvas.current.getContext("2d")!.putImageData(canvasData, 0, 0);
    setImageSrc(canvas.current.toDataURL());
  };

  const healColor = (position: { x: number; y: number }) => {
    canvas.current.getContext("2d")!.clearRect(0, 0, image.width, image.height);
    canvas.current
      .getContext("2d")!
      .drawImage(
        originalImage.current,
        0,
        0,
        originalImage.current.width,
        originalImage.current.height,
      );
    canvas.current.getContext("2d")!.globalCompositeOperation = "destination-in";
    canvas.current.getContext("2d")!.moveTo(position.x, position.y);
    circle.moveTo(position.x, position.y);
    circle.arc(position.x, position.y, brushSize / 2, 0, 2 * Math.PI);
    canvas.current.getContext("2d")!.fill(circle);
    canvas.current.getContext("2d")!.globalCompositeOperation = "source-over";
    canvas.current.getContext("2d")!.drawImage(image, 0, 0, image.width, image.height);
    setImageSrc(canvas.current.toDataURL());
  };

  const removeArea = (position: { x: number; y: number }) => {
    canvas.current.getContext("2d")!.clearRect(0, 0, image.width, image.height);
    canvas.current.getContext("2d")!.drawImage(image, 0, 0, image.width, image.height);
    canvas.current.getContext("2d")!.globalCompositeOperation = "destination-out";
    canvas.current.getContext("2d")!.moveTo(position.x, position.y);
    circle.moveTo(position.x, position.y);
    circle.arc(position.x, position.y, brushSize / 2, 0, 2 * Math.PI);
    canvas.current.getContext("2d")!.fill(circle);
    canvas.current.getContext("2d")!.globalCompositeOperation = "source-over";
    setImageSrc(canvas.current.toDataURL());
  };

  const detectColor = (position: { x: number; y: number }) => {
    const colorData = canvas.current
      .getContext("2d")!
      .getImageData(position.x, position.y, 1, 1).data;
    return colorData;
  };

  const getLimitBox = (position: { x: number; y: number }) => {
    const x = position.x * 4;
    const y = image.width * position.y * 4 + 4 * position.x;
    return {
      x,
      y,
      width: brushSize,
      height: brushSize,
    };
  };

  const onMouseMoveSelectColor = (e: KonvaEventObject<MouseEvent>) => {
    canvas.current.getContext("2d")!.drawImage(image, 0, 0, image.width, image.height);
    const position = {
      x: e.target.getAbsolutePosition().x - e.target.offsetX(),
      y: e.target.getAbsolutePosition().y - e.target.offsetY(),
    };
    const color = detectColor(position);
    const limitBox = getLimitBox(position);
    if (mode === "remove by color") {
      selectColor(color, limitBox.x, limitBox.y, limitBox.width, limitBox.height);
    } else {
      selectArea(position.x, position.y, limitBox.width, limitBox.height);
    }
  };

  const onMouseDownAndMoveRemoveColor = (e: KonvaEventObject<MouseEvent>) => {
    const position = {
      x: e.target.getAbsolutePosition().x - e.target.offsetX(),
      y: e.target.getAbsolutePosition().y - e.target.offsetY(),
    };
    const color = detectColor(position);
    const limitBox = getLimitBox(position);
    if (mode === "remove by color") {
      removeColor(color, limitBox.x, limitBox.y, limitBox.width, limitBox.height);
    } else if (mode === "heal area") {
      healColor(position);
    } else {
      removeArea(position);
    }
  };

  const onMouseUp = (e: KonvaEventObject<MouseEvent>) => {
    image.src = canvas.current.toDataURL();
  };

  const onMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    canvas.current.getContext("2d")!.drawImage(image, 0, 0, width, height);
  };

  const toggleMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerText === "remove by color") {
      setMode("heal area");
    } else if (e.currentTarget.innerText === "heal area") {
      setMode("remove area");
    } else {
      setMode("remove by color");
    }
    return mode;
  };

  return {
    onMouseMoveSelectColor,
    onMouseDownAndMoveRemoveColor,
    onMouseUp,
    onMouseLeave,
    toggleMode,
  };
};

export default useBrush;
