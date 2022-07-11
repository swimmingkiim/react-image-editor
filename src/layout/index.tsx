import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import sizeStyles from "../style/size.module.css";
import colorStyles from "../style/color.module.css";
import alignStyles from "../style/align.module.css";
import positionStyles from "../style/position.module.css";
import spaceStyles from "../style/space.module.css";
import overflowStyles from "../style/overflow.module.css";

type LayoutProps = {
  header?: React.ReactNode;
  navBar?: React.ReactNode;
  settingBar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ header, navBar, settingBar, children, footer }) => (
  <Container fluid className={[sizeStyles.height100, overflowStyles.hide].join(" ")}>
    <Row
      xs={12}
      className={[
        sizeStyles.height5,
        positionStyles.relative,
        positionStyles.zIndex1,
        spaceStyles.mt1rem,
      ].join(" ")}>
      {header}
    </Row>
    <Row
      xs={12}
      className={[sizeStyles.height90, positionStyles.relative, positionStyles.zIndex1].join(" ")}>
      <Col
        xs="auto"
        className={[
          colorStyles.darkTheme,
          sizeStyles.widthLogo,
          sizeStyles.height100,
          alignStyles.fromTopCenter,
        ].join(" ")}>
        {navBar}
      </Col>
      <Col className={["h-100", positionStyles.relative, colorStyles.greyTheme].join(" ")}>
        {children}
      </Col>
      <Col
        xs={2}
        className={[
          colorStyles.darkTheme,
          sizeStyles.height100,
          positionStyles.relative,
          positionStyles.zIndex1,
        ].join(" ")}>
        {settingBar}
      </Col>
    </Row>
    <Row
      xs={12}
      className={[
        colorStyles.darkTheme,
        sizeStyles.height5,
        positionStyles.relative,
        positionStyles.zIndex1,
      ].join(" ")}>
      {footer}
    </Row>
  </Container>
);

export default Layout;
