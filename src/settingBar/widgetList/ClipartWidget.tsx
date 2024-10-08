import React, { useState, useCallback } from "react";
import presetImageList from "../../config/image.json";
import useImageAsset from "../../hook/useImageAsset";
import useI18n from "../../hook/usei18n";
import positionStyles from "../../style/position.module.css";
import "react-dropzone/examples/theme.css";
import "./ClipartWidget.css";

export const IMAGE_LIST_KEY = "importedImage";

export type ClipartWidgetProps = {
  onClick: () => void
};

const ClipartWidget: React.FC<ClipartWidgetProps> = ({onClick}) => {
  const { setImageAsset, getAllImageAsset } = useImageAsset();
  const { getTranslation } = useI18n();
  const [imageAssetList, setImageAssetList] = useState(() => {
    if (getAllImageAsset().length) {
      return [...getAllImageAsset()!];
    }
    setImageAsset(presetImageList);
    return [...presetImageList];
  });

  return (
    <>
      <div
        className={[
          "d-flex flex-row align-items-center justify-content-center browse-clipart",
        ].join(" ")}
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          className="bi bi-palette mx-1"
          viewBox="0 0 14 14"
        >
          <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
          <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
        </svg>
        <span className={[positionStyles["toolbar-section-stack-h6"], "m-1"].join(" ")}>
          {getTranslation("widget", "browseClipart", "name")}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          className="bi bi-arrow-right mx-1"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      </div>
      <hr className="m-0"></hr>
    </>
  );
};

export default ClipartWidget;
