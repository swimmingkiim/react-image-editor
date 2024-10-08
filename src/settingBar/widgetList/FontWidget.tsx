import React, { useState, useCallback } from "react";
import useI18n from "../../hook/usei18n";
import positionStyles from "../../style/position.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import "react-dropzone/examples/theme.css";
import themeStyles from "../../style/theme.module.css";

interface FontSettings {
  font: string;
  size: number;
  alignment: 'left' | 'center' | 'right';
}

export const IMAGE_LIST_KEY = "importedImage";

const FontWidget: React.FC = () => {
  const { getTranslation } = useI18n();
  const [fontSize, setFontSize] = useState(13);
  const [alignment, setAlignment] = useState('left');
  const [rotation, setRotation] = useState<number>(25);
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    font: 'Helvetica',
    size: 19,
    alignment: 'left',
  });

  const handleAlignmentChange = (align: string) => {
    setAlignment(align);
  };

  return (
    <div
      className={[
        positionStyles["toolbar-section-container"],
        positionStyles["toolbar-section-container-button"],
      ].join(" ")}
    >
      
    </div>
  );
};

export default FontWidget;
