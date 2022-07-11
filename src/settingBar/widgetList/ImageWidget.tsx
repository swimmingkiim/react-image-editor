import React, { useState } from "react";
import { Button, Col, Figure, Row } from "react-bootstrap";
import { nanoid } from "nanoid";
import presetImageList from "../../config/image.json";
import { ImageItemKind } from "../../view/object/image";
import colorStyles from "../../style/color.module.css";
import borderStyles from "../../style/border.module.css";
import sizeStyles from "../../style/size.module.css";
import spaceStyles from "../../style/space.module.css";
import displayStyles from "../../style/display.module.css";
import alignStyles from "../../style/align.module.css";
import fontStyles from "../../style/font.module.css";
import Drag from "../../util/Drag";
import TRIGGER from "../../config/trigger";
import useImageAsset from "../../hook/useImageAsset";
import useI18n from "../../hook/usei18n";

export const IMAGE_LIST_KEY = "importedImage";

const ImageWidget: React.FC = () => {
  const { setImageAsset, getAllImageAsset } = useImageAsset();
  const { getTranslation } = useI18n();
  const [imageAssetList, setImageAssetList] = useState(() => {
    if (getAllImageAsset().length) {
      return [...getAllImageAsset()!];
    }
    setImageAsset(presetImageList);
    return [...presetImageList];
  });

  const uploadImage = () => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageAssetList((prev) => {
        const result = [
          {
            type: "image",
            id: nanoid(),
            name: "imported image",
            src: fileReader.result as string,
          },
          ...prev,
        ];
        setImageAsset(result);
        return result;
      });
    };
    const file = document.createElement("input");
    file.type = "file";
    file.accept = "image/png, image/jpeg";
    file.onchange = (e) => {
      const event = e;
      if (event.target && (event.target as HTMLInputElement).files) {
        Object.values((event.target as HTMLInputElement).files!).forEach((file) => {
          fileReader.readAsDataURL(file);
        });
      }
    };
    file.click();
  };

  return (
    <Col className={[sizeStyles["mx-h-30vh"]].join(" ")}>
      <Row>
        <h6>
          {getTranslation("widget", "image", "name")}
          <Button
            className={[
              colorStyles.transparentDarkColorTheme,
              borderStyles.none,
              displayStyles["inline-block"],
              sizeStyles.width25,
              spaceStyles.p0,
              spaceStyles.ml1rem,
              alignStyles["text-left"],
            ].join(" ")}
            onClick={uploadImage}>
            <i className="bi-plus" />
          </Button>
        </h6>
      </Row>
      <Row xs={2}>
        {imageAssetList.map((_data) => (
          <ImageThumbnail
            key={`image-thumbnail-${_data.id}`}
            data={{
              id: _data.id,
              src: _data.src ?? `find:${_data.id}`,
              name: _data.name,
              "data-item-type": _data.type,
            }}
            maxPx={80}
          />
        ))}
      </Row>
    </Col>
  );
};

export default ImageWidget;

const ImageThumbnail: React.FC<{
  maxPx: number;
  data: Omit<ImageItemKind, "image">;
}> = ({ data: { id, ...data }, maxPx }) => {
  const { getImageAssetSrc } = useImageAsset();
  return (
    <Figure as={Col} className={[alignStyles.absoluteCenter, alignStyles.wrapTrue].join(" ")}>
      <Drag
        dragType="copyMove"
        dragSrc={{
          trigger: TRIGGER.INSERT.IMAGE,
          "data-item-type": data["data-item-type"],
          src: data.src.startsWith("data:")
            ? data.src
            : `${process.env.PUBLIC_URL}/assets/image/${data.src}`,
        }}>
        <Figure.Image
          alt={data.name}
          src={
            data.src.startsWith("data:")
              ? data.src
              : `${process.env.PUBLIC_URL}/assets/image/${data.src}`
          }
        />
      </Drag>
      <Figure.Caption
        className={[fontStyles.font075em, sizeStyles.width100, "text-center"].join(" ")}>
        {data.name}
      </Figure.Caption>
    </Figure>
  );
};
