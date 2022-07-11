import React from "react";
import { ButtonGroup, ButtonToolbar, Nav } from "react-bootstrap";
import colorStyles from "../style/color.module.css";
import alignStyles from "../style/align.module.css";

type NavBarProps = {
  children: React.ReactNode;
};

const NavBar: React.FC<NavBarProps> = ({ children }) => (
  <Nav className={[colorStyles.darkTheme, alignStyles.fromBottomCenter].join(" ")}>
    <ButtonToolbar>
      <ButtonGroup vertical>{children}</ButtonGroup>
    </ButtonToolbar>
  </Nav>
);

export default NavBar;
