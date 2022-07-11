import React from "react";
import { Col } from "react-bootstrap";
import colorStyles from "../style/color.module.css";
import alignStyles from "../style/align.module.css";
import sizeStyles from "../style/size.module.css";
import Logo from "./Logo";

type HeaderProps = {
  children: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => (
  <header
    className={[
      colorStyles.darkTheme,
      alignStyles.fromStartBottom,
      sizeStyles.height100,
      "p-0",
    ].join(" ")}>
    <Col
      xs="auto"
      className={[sizeStyles.widthLogo, sizeStyles.height100, alignStyles.absoluteCenter].join(
        " ",
      )}>
      <Logo />
    </Col>
    <Col>{children}</Col>
  </header>
);

export default Header;
