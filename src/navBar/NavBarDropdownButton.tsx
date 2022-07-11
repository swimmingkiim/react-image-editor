import React from "react";
import { Button, ButtonGroup, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavBarItemKind } from "./NavBarButton";
import colorStyles from "../style/color.module.css";
import fontStyles from "../style/font.module.css";
import borderStyles from "../style/border.module.css";
import positionStyles from "../style/position.module.css";
import sizeStyles from "../style/size.module.css";
import alignStyles from "../style/align.module.css";
import useStage from "../hook/useStage";

type NavBarDropdownButtonProps = {
  data: NavBarItemKind;
  stage: ReturnType<typeof useStage>;
};

const NavBarDropdownButton: React.FC<NavBarDropdownButtonProps> = ({ data }) => {
  if (!data["sub-button"]) return <></>;

  return (
    <ButtonGroup vertical>
      <Dropdown
        as={ButtonGroup}
        drop="end"
        data-navbar-id={data.id}
        variant={[" ", colorStyles.whiteTheme, borderStyles.colorGrey].join(" ")}>
        <Dropdown.Toggle as={CustomToggle} data={data} />
        <Dropdown.Menu className={[sizeStyles.width100, alignStyles.fromTopCenter].join(" ")}>
          {data["sub-button"].map((subData) => (
            <Dropdown.Item
              key={`navbar-${subData.id}`}
              data-navbar-id={subData.id}
              eventKey={data.id}
              className={[colorStyles.whiteTheme, "d-inline"].join(" ")}>
              {subData.icon ? <i className={`bi-${subData.icon}`} /> : subData.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default NavBarDropdownButton;

type CustomToggleProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  data: NavBarItemKind;
};

const CustomToggle = React.forwardRef<HTMLButtonElement, CustomToggleProps>(
  function CustomToggleItem({ children, onClick, data }, ref) {
    return  <OverlayTrigger
      placement="right"
      overlay={<Tooltip id={`tooltip_navbar-id_${data.id}`}>{data.desc}</Tooltip>}>
      <Button
        ref={ref}
        className={[colorStyles.whiteTheme, positionStyles.relative].join(" ")}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}>
        <i className={`bi-${data.icon}`} />
        <i
          className={[
            "bi-three-dots-vertical",
            fontStyles.fontHalf1em,
            positionStyles.absolute,
            positionStyles.right0,
            positionStyles.verticalCenter,
          ].join(" ")}>
          {children}
        </i>
      </Button>
    </OverlayTrigger>;
  }
);
