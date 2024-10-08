import React from "react";
import { Button, ButtonGroup, Overlay, OverlayTrigger, Stack, Image, Nav } from "react-bootstrap";
import colorStyles from "../style/color.module.css";
import borderStyles from "../style/border.module.css";
import fontStyles from "../style/font.module.css";
import useStage from "../hook/useStage";
import useI18n from "../hook/usei18n";
import { div } from "@tensorflow/tfjs-core";

export enum NavBarItemType {
  "tools",
  "selector",
};

export type NavBarItemKind = {
  id: string;
  name: string;
  desc: string;
  icon?: string;
  type?: string;
  active?: boolean;
  classes?: string[];
  "sub-button"?: NavBarItemKind[];
};

export type NavBarButtonProps = {
  onClick: (id) => void;
  data: NavBarItemKind[];
};

const NavBarButton: React.FC<NavBarButtonProps> = ({ data, onClick }) => {
  const { getTranslation } = useI18n();

  const renderNavBarMenu = (data: NavBarItemKind[]) => {
    if(data[0].type == "middle"){
      return (
        <>
          {data.map((o,i) => (
            <Button
              data-navbar-id={o.id}
              onClick={() => onClick(o.id)}
              className={[colorStyles["navbar-buttongroup-tools"],o.classes,"rounded-0"].join(" ")}>
              {o.icon ? (
                <i className={`bi-${o.icon}`} />
              ) : (
                getTranslation("hotkey", o.id, "name")
              )}
            </Button>
          ))}
        </>
      );
    }else if(data[0].type == "top"){
      return (
        <>
          {data.map(o => (
            <div
              className={[
                o.active
                  ? colorStyles.greyTheme
                  : colorStyles.whiteTheme,
                borderStyles.roundSM,
                fontStyles.fontHalf1em,
                o.active ? borderStyles.colorDark : borderStyles.none,
              ].join(" ")}
            >
              <Image src={o.icon} rounded />
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <Stack>
      {/* <OverlayTrigger
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
      </OverlayTrigger> */}
      {renderNavBarMenu(data)}
    </Stack>
  );
};

export default NavBarButton;
