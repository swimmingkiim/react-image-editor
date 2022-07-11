import React from "react";
import { Button, Nav } from "react-bootstrap";
import Tab, { TabKind, TabProps } from "./Tab";
import alignStyles from "../style/align.module.css";
import sizeStyles from "../style/size.module.css";
import colorStyles from "../style/color.module.css";
import borderStyles from "../style/border.module.css";

type TabGroupProps = {
  onClickTab: TabProps["onClickTab"];
  onCreateTab: () => void;
  onDeleteTab: (tabId: string) => void;
  tabList: TabKind[];
};

const TabGroup: React.FC<TabGroupProps> = ({ onClickTab, onCreateTab, onDeleteTab, tabList }) => (
  <Nav
    variant="tabs"
    className={[alignStyles.fromStartBottom, sizeStyles.height100, "pt-2", borderStyles.none].join(
      " ",
    )}>
    {tabList.map((data) => (
      <Tab key={`tab-${data.id}`} onClickTab={onClickTab} data={data} onDeleteTab={onDeleteTab} />
    ))}
    <Button
      className={[colorStyles.transparentTheme, borderStyles.none].join(" ")}
      onClick={onCreateTab}>
      <i className="bi-plus-circle" />
    </Button>
  </Nav>
);

export default TabGroup;
