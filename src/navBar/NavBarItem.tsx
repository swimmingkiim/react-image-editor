import React from 'react';
import { Button, Nav, Image } from 'react-bootstrap';
import { NavBarItemKind } from './NavBarButton';
import colorStyles from "../style/color.module.css";
import borderStyles from "../style/border.module.css";
import fontStyles from "../style/font.module.css";
import useI18n from "../hook/usei18n";

export type NavBarItemProps = {
    data: NavBarItemKind;
    onClick: (id) => void;
};

const NavBarItem: React.FC<NavBarItemProps> = ({data, onClick}) => {
    const { getTranslation } = useI18n();

    if(data.type === "middle"){
        return (
            <div key={data.id} className="p-1 align-items-center m-auto" style={{cursor:"pointer"}}>
                <i className={[`bi-${data.icon}`].join(" ")} style={{fontSize:"0.8rem"}}/>
            </div>
        );
    }else if(data.type == "top"){
        return (
            <div 
                key={data.id}
                className={['p-1'].join(" ")}
                style={{cursor:"pointer",width:"2.6rem",fontSize:".7rem"}}
            >
                <div
                    className={[
                        data.active
                          ? colorStyles.greyTheme
                          : colorStyles.whiteTheme,
                        borderStyles.roundSM,
                        fontStyles.fontHalf1em,
                        data.active ? borderStyles.colorDark : borderStyles.none,
                        data.classes,
                    ].join(" ")}
                    onClick={() => onClick(data.id)}
                    style={{height: "2.2rem", width: "2.2rem"}}
                >
                    <Image src={data.icon} rounded style={{height: "100%", margin: "auto"}}/>
                </div>
                <span>{data.name}</span>
            </div>
        );
    }
    return <></>;
};

export default NavBarItem;