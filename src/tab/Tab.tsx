import React from "react";
import { Button, Nav } from "react-bootstrap";
import colorStyles from "../style/color.module.css";
import borderStyles from "../style/border.module.css";
import displayStyles from "../style/display.module.css";
import sizeStyles from "../style/size.module.css";
import spaceStyles from "../style/space.module.css";
import fontStyles from "../style/font.module.css";
import alignStyles from "../style/align.module.css";

export type NavItemKind = {
  id: string;
  img: string;
  priority: number;
  active?: boolean;
};

export type TabKind = {
  id: string;
  active: boolean;
  name?: string;
  preview?: string;
  parts?: NavItemKind[];
};

export type TabProps = {
  data: TabKind;
  onClickTab: (e: React.MouseEvent<HTMLAnchorElement|HTMLElement, MouseEvent>, selectedTabKind: TabKind) => void;
  onDeleteTab: (tabId: string) => void;
  canClose?: boolean;
};

class Tab extends React.Component<TabProps> {
  render() {
    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      this.props.onDeleteTab(this.props.data.id);
    };

    return (
      <Nav.Item key={`tab-${this.props.data.id}`}>
        <Nav.Link
          eventKey={this.props.data.id}
          className={[
            this.props.data.active
              ? colorStyles.greyTheme
              : colorStyles.whiteTheme,
            borderStyles.roundTopSM,
            fontStyles.fontHalf1em,
            spaceStyles.p05em,
            spaceStyles.pl1rem,
            alignStyles["text-center"],
          ].join(" ")}
          data-file-id={this.props.data.id}
          data-active={this.props.data.active}
          onClick={(e) => this.props.onClickTab(e, this.props.data)}
        >
          {this.props.data.id}
          {this.props.canClose && (
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
            >
              <i className="bi-x" />
            </Button>
          )}
        </Nav.Link>
      </Nav.Item>
    );
  }
}

export default Tab;
