import React from "react";
import colorStyles from "../style/color.module.css";
import alignStyles from "../style/align.module.css";
import sizeStyles from "../style/size.module.css";
import borderStyles from "../style/border.module.css";
import NavBarItem from "./NavBarItem";
import { NavBarItemKind } from "./NavBarButton";
import themeStyles from "../style/theme.module.css";

type NavBarProps = {
  items: NavBarItemKind[];
  onClick: (id: string) => void;
  onSelect: (index: number) => void;
};

const NavBar: React.FC<NavBarProps> = ({ items, onClick, onSelect }) => {
  const groupBy = (array: NavBarItemKind[], key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const renderSubNavBar = (type:string, items: NavBarItemKind[], classes: string[]) => {
    const [ data, setData ] = React.useState<NavBarItemKind[]>(items);
    const onItemClick = (id: string, index: number) => {
      setData(data.map((o, i) => {
        if(i == index){
          return {...o, active: true};
        }
        return {...o, active: false};
      }));
      onSelect(index);
      onClick(id);
    };
    const onProductColorClick = () => {

    };
    const renderFeatures = () => {
      if(type === "top"){
        return (
          <>
            <hr></hr>
            <div className="d-flex flex-row justify-content-center align-items-center" style={{cursor: "pointer"}} onClick={onProductColorClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-standing-dress" viewBox="0 0 16 16">
                <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z"/>
              </svg>
              <i className="bi-circle-fill"></i>
            </div>
          </>
        );
      }
      return (<></>);
    };
    return (
      items && (
        <div className={[...classes,"p-2","flex-column","d-flex",themeStyles["navbar-parts"]].join(" ")}>
          {items.map((o, i) => (
            <>
              <NavBarItem data={o} onClick={(id) => onItemClick(id, i)}></NavBarItem>
              {/* {(i == 0 && items[0].type == "middle") && (<hr className="border border-danger border-1 opacity-20"></hr>)} */}
            </>
          ))}
          {renderFeatures()}
        </div>
      )
    );
  };

  let typedItem = groupBy(items, "type");

  const getContainerClasses = (key) => {
    if(key == "top"){
      return [borderStyles.roundBottomLeftSM, colorStyles["navbar-buttongroup-tools"],"text-center"];
    }else if(key == "middle"){
      return [borderStyles.roundTopLeftAndBottomLeftSM, colorStyles["navbar-buttongroup-tools"]];
    }
  };

  return (
    <div className={[alignStyles.fromBottomCenter, sizeStyles.height100, "d-flex","flex-column", "align-items-end"].join(" ")}>
      {["top","middle"].map(key => {
        const classes = getContainerClasses(key);
        return (
          <div className="h-100">
            {renderSubNavBar(key, typedItem[key], classes)}
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
