import React from "react";
import { Col } from "react-bootstrap";
import colorStyles from "../style/color.module.css";
import alignStyles from "../style/align.module.css";
import sizeStyles from "../style/size.module.css";

type FooterProps = {
  children: React.ReactNode;
};

const Footer: React.FC<FooterProps> = ({ children }) => (
  <footer className={[colorStyles.whiteTheme, sizeStyles.height100].join(" ")}>
    {children}
  </footer>
);

export default Footer;
