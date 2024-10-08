import React, { CSSProperties, forwardRef, RefObject } from'react';
import DefaultMenu, { DefaultMenuItemType } from './DefaultMenu';
import ClipartMenu from './ClipartMenu';
import { EventName } from '../../config/constants';
import useCompRect from '../../hook/useComp/useCompRect';
import borderStyles from '../../style/border.module.css';
import useEvent from '../../hook/useEvent';
import themeStyles from '../../style/theme.module.css';

export type WidgetSideBarProps = {
    activeMenu: SubmenuType;
    onDefaultMenuClick: (reference: RefObject<HTMLDivElement>, itemType: DefaultMenuItemType) => void;
};

export enum SubmenuType {
    Default = 'default',
    Clipart = 'clipart',
};

const WidgetSideBar = forwardRef<HTMLDivElement, WidgetSideBarProps>(({activeMenu, onDefaultMenuClick}, ref) => {
    const [submenuStyle, setSubmenuStyle] = React.useState({});
    const settingBarEvent = useCompRect(EventName.SETTING_BAR_EVENT);
    const [ settingBarRect, setSettingBarRect ] = React.useState(null);
    const event = useEvent();

    event.on(EventName.CLIPART_BAR_OPEN_EVENT, isOpen => {
        if(isOpen){
            
        }else{
            
        }
    });

    const getMenuItems = (data, menu) => {
        switch (menu) {
            case "clipart":
                return {
                    id: 'clipart',
                    title: 'Clipart',
                    classes: [],
                    style: {
                        width: "19rem",
                        textAlign: 'center',
                        top: `${Math.max(0, data.y)}px`,
                        left: `${data.x + data.width}px`,
                        maxHeight: `calc(100vh - ${Math.max(0, data.y)}px)`,
                        color:"#E3E6E8",
                        position: 'fixed',
                        zIndex: 1,
                    }  as CSSProperties,
                    component: <ClipartMenu></ClipartMenu>,
                };
                default:
                case "default":
                    return {
                        id: 'default',
                        title: 'Default',
                        classes: [
                            borderStyles["roundBottomRightSM-5"],
                        ],
                        style: {
                            width: "69px",
                            textAlign: 'center',
                            top: `${Math.max(0, data.y)}px`,
                            left: `${data.x + data.width}px`,
                            maxHeight: `calc(100vh - ${Math.max(0, data.y)}px)`,
                            color:"#E3E6E8",
                            position: 'fixed',
                            zIndex: 1,
                        } as CSSProperties,
                        component: <DefaultMenu onClick={onDefaultMenuClick}></DefaultMenu>,
                    };
        };
    }

    const onMenuClick = () => {
        
    };

    settingBarEvent.onEvent((data) => {
        setSettingBarRect(data);
    });

    const render = () => {
        if(settingBarRect && activeMenu){
            return (
                <div ref={ref} className={["overflow-hidden overflow-y-auto", themeStyles["setting-sidbar"]].concat(getMenuItems(settingBarRect, activeMenu).classes).join(" ")} style={getMenuItems(settingBarRect, activeMenu).style}>
                    {getMenuItems(settingBarRect, activeMenu).component}
                </div>
            );
        }
        return <></>;
    };
    return render();
});

export default WidgetSideBar;