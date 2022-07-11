import React from "react";
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import colorStyles from "../style/color.module.css";
import borderStyles from "../style/border.module.css";
import useStage from "../hook/useStage";
import useI18n from "../hook/usei18n";

export type NavBarItemKind = {
  id: string;
  name: string;
  desc: string;
  icon?: string;
  "sub-button"?: NavBarItemKind[];
};

type NavBarButtonProps = {
  stage: ReturnType<typeof useStage>;
  onClick: () => void;
  data: NavBarItemKind;
};

const NavBarButton: React.FC<NavBarButtonProps> = ({ data, onClick }) => {
  const { getTranslation } = useI18n();

  return (
    <ButtonGroup vertical>
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id={`tooltip_navbar-id_${data.id}`}>
            {getTranslation("workMode", data.id, "desc")}
          </Tooltip>
        }>
        <Button
          data-navbar-id={data.id}
          onClick={onClick}
          className={[colorStyles.whiteTheme, borderStyles.colorGrey].join(" ")}>
          {data.icon ? (
            <i className={`bi-${data.icon}`} />
          ) : (
            getTranslation("hotkey", data.id, "name")
          )}
        </Button>
      </OverlayTrigger>
    </ButtonGroup>
  );
};

export default NavBarButton;
