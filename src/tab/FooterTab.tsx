import React from "react";
import Tab, { TabKind } from "./Tab";
import { Button, Nav, Image } from "react-bootstrap";
import colorStyles from "../style/color.module.css";
import borderStyles from "../style/border.module.css";
import displayStyles from "../style/display.module.css";
import sizeStyles from "../style/size.module.css";
import spaceStyles from "../style/space.module.css";
import fontStyles from "../style/font.module.css";
import alignStyles from "../style/align.module.css";
import positionStyles from "../style/position.module.css";

class FooterTab extends Tab {
  render() {
    const { data, onDeleteTab, onClickTab } = this.props;
    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onDeleteTab(data.id);
    };
    return (
      <Nav.Item as="div" key={`tab-${data.id}`} className="p-1" style={{ position: "relative" }}>
        <Nav.Link
          eventKey={data.id}
          className={[
            data.active
              ? colorStyles.greyTheme
              : colorStyles.whiteTheme,
            borderStyles.roundSM,
            fontStyles.fontHalf1em,
            data.active ? borderStyles.colorDark : borderStyles.none,
          ].join(" ")}
          data-file-id={data.id}
          data-active={data.active}
          onClick={(e) => onClickTab(e, data)}
        >
          {data.active ? (
            <Button
              className={[
                colorStyles.transparentDarkColorTheme,
                borderStyles.none,
                displayStyles["inline-block"],
                sizeStyles.width25,
                spaceStyles.p0,
                spaceStyles.ml1rem,
                alignStyles["text-left"],
              ].join(" ")}
              onClick={onDelete}
              style={{ top: "-2px", right: "-2px", position: "absolute" }}
            >
              <i className="bi-x-circle-fill" />
            </Button>
          ):<></>}
          <Image src={data.preview} rounded />
        </Nav.Link>
      </Nav.Item>
    );
  }
}

export default FooterTab;
