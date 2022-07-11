import React from "react";
import { Button, Nav } from "react-bootstrap";
import colorStyles from "../style/color.module.css";
import borderStyles from "../style/border.module.css";
import displayStyles from "../style/display.module.css";
import sizeStyles from "../style/size.module.css";
import spaceStyles from "../style/space.module.css";
import fontStyles from "../style/font.module.css";
import alignStyles from "../style/align.module.css";

export type TabKind = {
  id: string;
  active: boolean;
};

export type TabProps = {
  data: TabKind;
  onClickTab: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onDeleteTab: (tabId: string) => void;
};

const Tab: React.FC<TabProps> = ({ data, onClickTab, onDeleteTab }) => {
  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteTab(data.id);
  };

  return (
    <Nav.Item key={`tab-${data.id}`}>
      <Nav.Link
        eventKey={data.id}
        className={[
          data.active ? colorStyles.greyTheme : colorStyles.whiteTheme,
          borderStyles.roundTopSM,
          fontStyles.fontHalf1em,
          spaceStyles.p05em,
          spaceStyles.pl1rem,
          alignStyles["text-center"],
        ].join(" ")}
        data-file-id={data.id}
        data-active={data.active}
        onClick={onClickTab}>
        {data.id}
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
          onClick={onDelete}>
          <i className="bi-x" />
        </Button>
      </Nav.Link>
    </Nav.Item>
  );
};

export default Tab;
