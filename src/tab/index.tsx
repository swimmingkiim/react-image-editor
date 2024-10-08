import React from "react";
import { Button, Nav } from "react-bootstrap";
import Tab, { TabKind, TabProps } from "./Tab";
import FooterTab from "./FooterTab";
import alignStyles from "../style/align.module.css";
import sizeStyles from "../style/size.module.css";
import colorStyles from "../style/color.module.css";
import borderStyles from "../style/border.module.css";
import fontStyles from "../style/font.module.css";

type TabGroupProps = {
  onClickTab: TabProps["onClickTab"];
  onCreateTab: () => void;
  onDeleteTab: (tabId: string) => void;
  tabList: TabKind[];
  isHeader?: boolean;
};

const TabGroup: React.FC<TabGroupProps> = ({
  onClickTab,
  onCreateTab,
  onDeleteTab,
  tabList,
  isHeader,
}) => {
  const renderTab = (data) => {
    if (isHeader) {
      return (
        <Tab
          key={`tab-${data.id}`}
          onClickTab={onClickTab}
          data={data}
          onDeleteTab={onDeleteTab}
        />
      );
    } else {
      return (
        <FooterTab
          key={`tab-${data.id}`}
          onClickTab={onClickTab}
          data={data}
          onDeleteTab={onDeleteTab}
        />
      );
    }
  };
  return (
    <Nav
      variant="tabs"
      className={[
        alignStyles["fromStartCenter-footer"],
        sizeStyles.height100,
        borderStyles.none,
      ].join(" ")}
    >
      {tabList.map((data) => renderTab(data))}
      <Button
        className={[
          colorStyles.transparentTheme,
          borderStyles.none,
          colorStyles.blackColor,
          fontStyles.font2em,
        ].join(" ")}
        onClick={onCreateTab}
      >
        <i className="bi-plus-circle" />
      </Button>
    </Nav>
  );
};

export default TabGroup;
