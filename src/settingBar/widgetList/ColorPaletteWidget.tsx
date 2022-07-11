import React, { useEffect, useState } from "react";
import { Button, Col, Figure, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Filter, Node, NodeConfig } from "konva/lib/Node";
import RangeSlider from "react-bootstrap-range-slider";
import { ColorResult, SketchPicker } from "react-color";
import { nanoid } from "nanoid";
import Konva from "konva";
import colorPaletteList from "../../config/colorPalette.json";
import colorStyles from "../../style/color.module.css";
import borderStyles from "../../style/border.module.css";
import sizeStyles from "../../style/size.module.css";
import spaceStyles from "../../style/space.module.css";
import displayStyles from "../../style/display.module.css";
import positionStyles from "../../style/position.module.css";
import alignStyles from "../../style/align.module.css";
import fontStyles from "../../style/font.module.css";
import { WidgetKind } from "../Widget";
import { SettingBarProps } from "..";
import useItem from "../../hook/useItem";
import useLocalStorage from "../../hook/useLocalStorage";
import useI18n from "../../hook/usei18n";

export type ColorPaletteKind = {
  "data-item-type": string;
  id: string;
  colorCode: string;
  selectedItems: Node<NodeConfig>[];
};

type ColorPaletteWidgetProps = {
  data: WidgetKind & SettingBarProps;
};

export const COLOR_LIST_KEY = "colorList";

const ColorPaletteWidget: React.FC<ColorPaletteWidgetProps> = ({ data }) => {
  const { getValue, setValue } = useLocalStorage();
  const { updateItem } = useItem();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState<string>("#000000");
  const { getTranslation } = useI18n();
  const [colorList, setColorList] = useState(() => {
    if (getValue(COLOR_LIST_KEY)) {
      return [...getValue(COLOR_LIST_KEY)!];
    }
    return [...colorPaletteList];
  });

  const changeNewColor = (color: ColorResult) => {
    setNewColor(color.hex);
  };

  const toggleColorPicker = (e?: React.MouseEvent<HTMLElement>) => {
    if (showColorPicker) {
      addColor();
    }
    setShowColorPicker((prev) => !prev);
  };

  const addColor = () => {
    if (!colorList.find((color) => color.colorCode === newColor)) {
      const newList = [
        ...colorList,
        {
          id: nanoid(),
          type: "color",
          colorCode: newColor,
        },
      ];
      setValue(COLOR_LIST_KEY, newList);
      setColorList(newList);
    }
  };

  const onClearColorClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!data.selectedItems[0]) {
      return;
    }
    if (e.shiftKey) {
      data.selectedItems[0].attrs.stroke = undefined;
    } else {
      data.selectedItems[0].attrs.fill = "transparent";
    }
    updateItem(data.selectedItems[0].id(), (attrs) => data.selectedItems[0].attrs);
  };
  return (
    <Col>
      <h6>
        {getTranslation("widget", "colorPalette", "name")}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="tooltip-clear-color">
              {getTranslation("widget", "colorPalette", "addColor", "name")}
            </Tooltip>
          }>
          <Button
            className={[
              colorStyles.transparentDarkColorTheme,
              borderStyles.none,
              displayStyles["inline-block"],
              sizeStyles.width10,
              spaceStyles.p0,
              spaceStyles.ml1rem,
              alignStyles["text-left"],
            ].join(" ")}
            onClick={toggleColorPicker}>
            <i className="bi-plus" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="tooltip-clear-color">
              {getTranslation("widget", "colorPalette", "clearColor", "name")}
            </Tooltip>
          }>
          <Button
            className={[
              colorStyles.transparentDarkColorTheme,
              borderStyles.none,
              displayStyles["inline-block"],
              sizeStyles.width10,
              spaceStyles.p0,
              spaceStyles.ml1rem,
              alignStyles["text-left"],
            ].join(" ")}
            onClick={onClearColorClick}>
            <i className="bi-x-circle" />
          </Button>
        </OverlayTrigger>
      </h6>
      {showColorPicker && (
        <SketchPicker
          color={newColor}
          onChange={changeNewColor}
          className={[positionStyles.absolute, positionStyles.left0, positionStyles.zIndex3].join(
            " ",
          )}
        />
      )}
      <Row xs={4}>
        {colorList.map((_data) => (
          <ColorPaletteThumbnail
            key={`colorPalette-thumbnail-${_data.id}`}
            data={{
              id: _data.id,
              "data-item-type": "color",
              colorCode: _data.colorCode,
              selectedItems: data.selectedItems,
            }}
          />
        ))}
      </Row>
      <ColorPaletteOpacitySlider
        data={{
          "data-item-type": "opacity",
          selectedItems: data.selectedItems,
        }}
      />
      <ColorPaletteBrightnessSlider
        data={{
          "data-item-type": "brightness",
          selectedItems: data.selectedItems,
        }}
      />
      <ColorPaletteGrayScaleToggle
        data={{
          "data-item-type": "grayScale",
          selectedItems: data.selectedItems,
        }}
      />
    </Col>
  );
};

export default ColorPaletteWidget;

const ColorPaletteThumbnail: React.FC<{
  data: ColorPaletteKind;
}> = ({ data: { id, ...data } }) => {
  const { updateItem } = useItem();

  const onClickColorBlock = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.getSelection()?.removeAllRanges();
    data.selectedItems.forEach((item) => {
      if (e.shiftKey) {
        item.attrs.stroke = data.colorCode;
      } else {
        item.attrs.fill = data.colorCode;
      }
      updateItem(item.id(), () => item.attrs);
    });
    data.selectedItems[0].getStage()?.batchDraw();
  };

  return (
    <Figure as={Col} className={[alignStyles.absoluteCenter, alignStyles.wrapTrue].join(" ")}>
      <div
        onClick={onClickColorBlock}
        style={{ width: 20, height: 20, backgroundColor: data.colorCode }}
      />
      <Figure.Caption className={[fontStyles.fontHalf1em, "text-center"].join(" ")}>
        {`${data.colorCode}`}
      </Figure.Caption>
    </Figure>
  );
};

const ColorPaletteOpacitySlider: React.FC<{
  data: Omit<Omit<ColorPaletteKind, "colorCode">, "id">;
}> = ({ data }) => {
  const { updateItem } = useItem();
  const { getTranslation } = useI18n();

  const [opacity, setOpacity] = useState(
    data.selectedItems[0] ? data.selectedItems[0].attrs.opacity * 100 : 100,
  );

  useEffect(() => {
    setOpacity(
      data.selectedItems[0]
        && data.selectedItems[0].attrs.opacity !== undefined
        && data.selectedItems[0].attrs.opacity !== null
        ? data.selectedItems[0].attrs.opacity * 100
        : 100,
    );
  }, [data.selectedItems]);

  const onChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(parseInt(e.currentTarget.value));
    if (data.selectedItems.length === 0) {
      return;
    }
    data.selectedItems.forEach((item) => {
      item.opacity(parseInt(e.currentTarget.value) * 0.01);
      item.attrs.opacity = parseInt(e.currentTarget.value) * 0.01;
      updateItem(item.id(), () => item.attrs);
    });
    data.selectedItems[0].getStage()?.batchDraw();
  };

  return (
    <Col>
      <h6>{getTranslation("widget", "colorPalette", "opacity", "name")}</h6>
      <RangeSlider
        tooltipLabel={(value) => `${value}%`}
        value={opacity}
        onChange={onChangeOpacity}
      />
    </Col>
  );
};

const ColorPaletteBrightnessSlider: React.FC<{
  data: Omit<Omit<ColorPaletteKind, "colorCode">, "id">;
}> = ({ data }) => {
  const { updateItem } = useItem();
  const { getTranslation } = useI18n();

  const [brightness, setBrightNess] = useState(
    data.selectedItems[0] && data.selectedItems[0].attrs.brightness
      ? data.selectedItems[0].attrs.brightness * 100
      : 0,
  );

  useEffect(() => {
    setBrightNess(
      data.selectedItems[0]
        && data.selectedItems[0].attrs.brightness !== undefined
        && data.selectedItems[0].attrs.brightness !== null
        ? data.selectedItems[0].attrs.brightness * 100
        : 0,
    );
  }, [data.selectedItems]);

  const onChangeBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightNess(parseInt(e.currentTarget.value));
    if (data.selectedItems.length === 0) {
      return;
    }
    data.selectedItems.forEach((item) => {
      item.brightness(parseInt(e.currentTarget.value) * 0.01);
      item.attrs.brightness = parseInt(e.currentTarget.value) * 0.01;
      updateItem(item.id(), () => item.attrs);
    });
    data.selectedItems[0].getStage()?.batchDraw();
  };

  return (
    <Col>
      <h6>{getTranslation("widget", "colorPalette", "brightness", "name")}</h6>
      <RangeSlider
        tooltipLabel={(value) => `${value}%`}
        value={brightness}
        onChange={onChangeBrightness}
      />
    </Col>
  );
};

const ColorPaletteGrayScaleToggle: React.FC<{
  data: Omit<Omit<ColorPaletteKind, "colorCode">, "id">;
}> = ({ data }) => {
  const { updateItem } = useItem();
  const { getTranslation } = useI18n();
  const [grayScale, setGrayScale] = useState<boolean>(
    !!(
      data.selectedItems[0]
      && data.selectedItems[0].filters()
      && data.selectedItems[0].filters().find((_filter) => _filter === Konva.Filters.Grayscale)
    ),
  );

  const onChangeGrayScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrayScale(e.currentTarget.checked);
    if (data.selectedItems.length === 0) {
      return;
    }
    let newFilters: Filter[] = [];
    if (data.selectedItems[0].filters().find((_filter) => _filter === Konva.Filters.Grayscale)) {
      data.selectedItems[0].filters(
        data.selectedItems[0]
          .filters()
          .filter((_filter: Filter) => _filter !== Konva.Filters.Grayscale),
      );
      newFilters = data.selectedItems[0]
        .filters()
        .filter((_filter) => _filter !== Konva.Filters.Grayscale);
    } else {
      data.selectedItems[0].filters([...data.selectedItems[0].filters(), Konva.Filters.Grayscale]);
      newFilters = [...data.selectedItems[0].filters(), Konva.Filters.Grayscale];
    }
    updateItem(data.selectedItems[0].id(), () => ({
      ...data.selectedItems[0].attrs,
      _filters: newFilters.map((_filter: Filter) => _filter.name),
    }));
    data.selectedItems[0].getStage()?.batchDraw();
  };

  useEffect(() => {
    setGrayScale(
      !!(
        data.selectedItems[0]
        && data.selectedItems[0].filters()
        && data.selectedItems[0].filters().find((_filter) => _filter === Konva.Filters.Grayscale)
      ),
    );
  }, [data.selectedItems]);

  return (
    <Col>
      <h6>{getTranslation("widget", "colorPalette", "grayScale", "name")}</h6>
      <Form>
        <Form.Check
          checked={grayScale}
          onChange={onChangeGrayScale}
          type="switch"
          label=""
          id="grayScaleSwitch"
        />
      </Form>
    </Col>
  );
};
