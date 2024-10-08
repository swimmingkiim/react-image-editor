import React, { useState, useCallback } from "react";
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
import positionStyles from "../../style/position.module.css";
import Drag from "../../util/Drag";
import TRIGGER from "../../config/trigger";
import useImageAsset from "../../hook/useImageAsset";
import useI18n from "../../hook/usei18n";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import "react-dropzone/examples/theme.css";
import { StageData } from "../../redux/currentStageData";

export const IMAGE_LIST_KEY = "importedImage";

export type ImageWidgetProps = {
  onCompleted?: (data: StageData) => void;
};

const ImageWidget: React.FC<ImageWidgetProps> = ({onCompleted}) => {
  const { getTranslation } = useI18n();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      onCompleted({
        id: nanoid(),
        attrs: {
          name: "imported image",
          "data-item-type": "image",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          src: URL.createObjectURL(file),
          zIndex: 2,
          brightness: 0,
          draggable: true,
          updatedAt: Date.now(),
        },
        className: "sample-image",
        refRect: null,
        children: [],
      });
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({onDrop});

  const uploadImage = () => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        onCompleted({
          id: nanoid(),
          attrs: {
            name: "imported image",
            "data-item-type": "image",
            x: 0,
            y: 0,
            width: img.width,
            height: img.height,
            src: img.src,
            zIndex: 0,
            brightness: 0,
            updatedAt: Date.now(),
          },
          className: "sample-image",
          children: [],
        });
      };
      img.src = e.target.result as string;
    };
    const file = document.createElement("input");
    file.type = "file";
    file.accept = "image/png, image/jpeg";
    file.onchange = (e) => {
      const event = e;
      if (event.target && (event.target as HTMLInputElement).files) {
        Object.values((event.target as HTMLInputElement).files!).forEach(
          (file) => {
            fileReader.readAsDataURL(file);
          },
        );
      }
    };
    file.click();
  };

  return (
    <>
      <Col
        className={[sizeStyles["mx-h-30vh"]]
          .concat([positionStyles["toolbar-section-container"]])
          .join(" ")}
      >
        <Row>
          <h6
            className={[positionStyles["toolbar-section-h6"]].join(" ")}
            style={{ marginTop: "15px", fontSize: "0.8rem" }}
          >
            {getTranslation("widget", "uploadPhoto", "name")}
          </h6>
        </Row>
        <div>
          <section
            className={["container"]
              .concat([positionStyles["toolbar-upload-photo-dropzone"]])
              .join(" ")}
          >
            <div
              {...getRootProps({
                className: "dropzone",
                style: {
                  background: "rgba(0,0,0,0)",
                  alignItems: "center",
                  margin: "0.2rem 0",
                },
              })}
            >
              <input {...getInputProps()}/>
              <p className="m-auto">+</p>
            </div>
          </section>
          <p style={{fontSize: "0.8rem", fontWeight: "300", fontStyle: "italic", color: "#9798A4", marginBottom: "0"}}>
            (JPG,PNG,EPS,AI,& PDF)
          </p>
          <p style={{fontSize: "0.8rem", fontWeight: "300", fontStyle: "italic", color: "#9798A4", marginBottom: "0"}}>
            Max 5 MB
          </p>
        </div>
      </Col>
      <hr className="m-0"></hr>
    </>
  );
};

export default ImageWidget;

const ImageThumbnail: React.FC<{
  maxPx: number;
  data: Omit<ImageItemKind, "image">;
}> = ({ data: { id, ...data }, maxPx }) => {
  const { getImageAssetSrc } = useImageAsset();
  return (
    <Figure
      as={Col}
      className={[alignStyles.absoluteCenter, alignStyles.wrapTrue].join(" ")}
    >
      <Drag
        dragType="copyMove"
        dragSrc={{
          trigger: TRIGGER.INSERT.IMAGE,
          "data-item-type": data["data-item-type"],
          src: data.src.startsWith("data:")
            ? data.src
            : `/assets/image/${data.src}`,
        }}
      >
        <Figure.Image
          alt={data.name}
          src={
            data.src.startsWith("data:")
              ? data.src
              : `/assets/image/${data.src}`
          }
        />
      </Drag>
      <Figure.Caption
        className={[
          fontStyles.font075em,
          sizeStyles.width100,
          "text-center",
        ].join(" ")}
      >
        {data.name}
      </Figure.Caption>
    </Figure>
  );
};
