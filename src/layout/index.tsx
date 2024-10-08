import React, { MutableRefObject, RefObject } from "react";
import { Col, Container, Row } from "react-bootstrap";
import sizeStyles from "../style/size.module.css";
import colorStyles from "../style/color.module.css";
import alignStyles from "../style/align.module.css";
import positionStyles from "../style/position.module.css";
import overflowStyles from "../style/overflow.module.css";
import themeStyles from "../style/theme.module.css";
import WidgetSideBar, { SubmenuType } from "../settingBar/sideBar";
import useCompRect from "../hook/useComp/useCompRect";
import { EventName } from "../config/constants";
import useEvent from "../hook/useEvent";
import CartView from "../cart";

type LayoutProps = {
  header?: React.ReactNode;
  navBar?: React.ReactNode;
  settingBar?: React.ReactNode;
  footer?: React.ReactNode;
  subMenu?: () => React.ReactNode;
  children: React.ReactNode;
  settingBarKey?: string;
};

const Layout: React.FC<LayoutProps> = ({
  header,
  navBar,
  settingBar,
  children,
  footer,
  subMenu,
  settingBarKey,
}) => {
  const [ show, setShow ] = React.useState(true);
  const [ activeMenu, setActiveMenu ] = React.useState(SubmenuType.Default);
  const settingBarEvent = useCompRect(EventName.SETTING_BAR_EVENT);
  const [ backgroundColorStyle, setBackgroundColorStyle ] = React.useState({backgroundColor: "#E3E6E8"});
  const { on } = useEvent();

  on(EventName.PRODUCT_PREVIEW_LOADED_EVENT, img => {
    setBackgroundColorStyle({backgroundColor: `#${img.color}`});
  });
  return(
    <div
      className={[sizeStyles.height100, sizeStyles.width100, overflowStyles.hide].join(" ")}
    >
      {header && (
        <Row
          xs={12}
          className={[
            sizeStyles.height5,
            positionStyles.relative,
            positionStyles.zIndex1,
          ].join(" ")}
        >
          {header}
        </Row>
      )}
      <Row
        xs={12}
        className={[
          sizeStyles.height100,
          positionStyles.relative,
          positionStyles.zIndex1,
        ].join(" ")}
      >
        <div className="d-flex">
          <div
            ref={settingBarEvent.ref}
            className={[
              sizeStyles.height100,
              alignStyles.fromTopCenter,
              themeStyles["setting-bar"],
              "px-1",
              "flex-1",
            ].join(" ")}
            style={{width: "200px"}}
          >
            {settingBar}
          </div>
          {subMenu()}
          <div 
            className={[
              "flex-1",
              sizeStyles.width100,
              sizeStyles.height100,
              positionStyles.relative,
            ].join(" ")}
            style={backgroundColorStyle}
          >
            {children}
          </div>
          <div
            className={[
              "flex-1",
              "justify-content-end",
              sizeStyles.height100,
              positionStyles.absolute,
              positionStyles.top0,
              positionStyles.right0,
              positionStyles.zIndex1,
              "me-2"
            ].join(" ")}
            style={backgroundColorStyle}
          >
            {navBar}
          </div>
        </div>
        {/* <Col
          xs="auto"
          ref={target}
          className={[
            sizeStyles.widthLogo,
            sizeStyles.height100,
            alignStyles.fromTopCenter,
            themeStyles["setting-bar"]
          ].join(" ")}
        >
          {settingBar}
        </Col>
        <Col
          className={[
            "h-100",
            positionStyles.relative,
            colorStyles.greyTheme,
          ].join(" ")}
        >
          {children}
        </Col>
        <Col
          xs="auto"
          className={[
            sizeStyles.height100,
            positionStyles.relative,
            positionStyles.zIndex1,
          ].join(" ")}
          style={commonStyle}
        >
          {navBar}
        </Col> */}
      </Row>
      {footer}
      {/* {footer && (
        <Row
          xs={12}
          className={[
            colorStyles.darkTheme,
            sizeStyles.height10,
            alignStyles.fromStartCenter,
            positionStyles.relative,
            positionStyles.zIndex1,
          ].join(" ")}
        >
          {footer}
        </Row>
      )} */}
    </div>
  );
};

export default Layout;
