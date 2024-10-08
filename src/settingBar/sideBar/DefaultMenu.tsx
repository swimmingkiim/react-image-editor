import React, { RefObject } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import borderStyles from "../../style/border.module.css";
import TextEditorMenu from "./TextEditorMenu";
import "./DefaultMenu.css";

export type DefaultMenuProps = {
    historyIndex?: number;
    onClick: (reference: RefObject<HTMLDivElement>, itemType: DefaultMenuItemType) => void;
};

export enum DefaultMenuItemType {
    BackHistory = "back-history",
    ForwardHistory = "forward-history",
    HorizonalCenter = "horizontal-center",
    VerticalCenter = "vertical-center",
    LayerUp = "layer-up",
    LayerDown = "layer-down",
    Text = "text",
};

const DefaultMenu:React.FC<DefaultMenuProps> = ({historyIndex = 0, onClick}) => {
    const [ referenceMap, setReferenceMap ] = React.useState<{"":RefObject<React.ReactNode>}>({"":null});
    const refs = Object.values(DefaultMenuItemType).map(o => {
        return {
            itemType: o,
            reference: React.createRef<HTMLDivElement|null>(),
        };
    });
    const fontClasses = [
        {
            itemType: DefaultMenuItemType.BackHistory,
            font: "arrow-90deg-left",
            svg: (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M0.700393 4.01809H0.517214C0.230591 4.01809 0 3.79421 0 3.51593V0.837739C0 0.634782 0.124993 0.450656 0.318948 0.37324C0.512903 0.295823 0.734874 0.33767 0.883573 0.482041L1.78008 1.35245C3.66791 -0.457418 6.70869 -0.451141 8.58574 1.37338C10.4714 3.20417 10.4714 6.17111 8.58574 8.0019C6.70007 9.8327 3.6442 9.8327 1.75853 8.0019C1.48914 7.74036 1.48914 7.31562 1.75853 7.05407C2.02791 6.79253 2.46538 6.79253 2.73477 7.05407C4.08168 8.36179 6.26475 8.36179 7.61166 7.05407C8.95857 5.74636 8.95857 3.62683 7.61166 2.31911C6.27121 1.01768 4.10538 1.0114 2.75632 2.29819L3.64205 3.16023C3.79074 3.3046 3.83385 3.52012 3.75411 3.70843C3.67437 3.89674 3.48473 4.01809 3.27569 4.01809H0.700393Z" fill="white"/>
                </svg>
            ),
        },
        {
            itemType: DefaultMenuItemType.ForwardHistory,
            font: "arrow-90deg-right",
            svg: (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.29961 4.01809H9.48279C9.76941 4.01809 10 3.79421 10 3.51593V0.837739C10 0.634782 9.87501 0.450656 9.68105 0.37324C9.4871 0.295823 9.26513 0.33767 9.11643 0.482041L8.21992 1.35245C6.33209 -0.457418 3.29131 -0.451141 1.41426 1.37338C-0.471419 3.20417 -0.471419 6.17111 1.41426 8.0019C3.29993 9.8327 6.3558 9.8327 8.24147 8.0019C8.51086 7.74036 8.51086 7.31562 8.24147 7.05407C7.97209 6.79253 7.53462 6.79253 7.26523 7.05407C5.91832 8.36179 3.73525 8.36179 2.38834 7.05407C1.04143 5.74636 1.04143 3.62683 2.38834 2.31911C3.72879 1.01768 5.89462 1.0114 7.24368 2.29819L6.35795 3.16023C6.20926 3.3046 6.16615 3.52012 6.24589 3.70843C6.32563 3.89674 6.51527 4.01809 6.72431 4.01809H9.29961Z" fill="#6C6C6C"></path>
                </svg>
            ),
        },
        {
            itemType: DefaultMenuItemType.VerticalCenter,
            font: "align-middle",
            svg: (
                <svg width="11" height="12" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.5C4.27614 0.5 4.5 0.723858 4.5 1V10C4.5 10.2761 4.27614 10.5 4 10.5C3.72386 10.5 3.5 10.2761 3.5 10V1C3.5 0.723858 3.72386 0.5 4 0.5Z" fill="white"/>
                    <path d="M0 3.875C0 3.39175 0.391751 3 0.875 3H7.125C7.60825 3 8 3.39175 8 3.875C8 4.35825 7.60825 4.75 7.125 4.75H0.875C0.391751 4.75 0 4.35825 0 3.875Z" fill="white"/>
                    <path d="M1 6.875C1 6.39175 1.39175 6 1.875 6H6.125C6.60825 6 7 6.39175 7 6.875C7 7.35825 6.60825 7.75 6.125 7.75H1.875C1.39175 7.75 1 7.35825 1 6.875Z" fill="white"/>
                </svg>
            ),
        },
        {
            itemType: DefaultMenuItemType.HorizonalCenter,
            font: "align-center",
            svg: (
                <svg width="12" height="11" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.5C-1.20706e-08 4.22386 0.223858 4 0.5 4L9.5 4C9.77614 4 10 4.22386 10 4.5C10 4.77614 9.77614 5 9.5 5L0.5 5C0.223858 5 1.20706e-08 4.77614 0 4.5Z" fill="white"/>
                    <path d="M3.375 8.5C2.89175 8.5 2.5 8.10825 2.5 7.625L2.5 1.375C2.5 0.891751 2.89175 0.5 3.375 0.5C3.85825 0.5 4.25 0.891751 4.25 1.375V7.625C4.25 8.10825 3.85825 8.5 3.375 8.5Z" fill="white"/>
                    <path d="M6.375 7.5C5.89175 7.5 5.5 7.10825 5.5 6.625V2.375C5.5 1.89175 5.89175 1.5 6.375 1.5C6.85825 1.5 7.25 1.89175 7.25 2.375V6.625C7.25 7.10825 6.85825 7.5 6.375 7.5Z" fill="white"/>
                </svg>
            ),
        },
        {
            itemType: DefaultMenuItemType.LayerUp,
            font: "layer-forward",
            svg: (
                <svg width="15" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5343 13.3321C10.2019 13.5511 9.77134 13.5521 9.43795 13.3347L1.27795 8.01295C0.674636 7.61948 0.672603 6.73649 1.2741 6.34025L9.63225 0.834285C9.96464 0.615322 10.3952 0.61433 10.7286 0.831761L18.8886 6.15348C19.4919 6.54695 19.494 7.42994 18.8925 7.82618L17.9946 8.41768L18.8881 9.00044C19.4915 9.39391 19.4935 10.2769 18.892 10.6731L10.5338 16.1791C10.2015 16.3981 9.77085 16.3991 9.43746 16.1816L2.90038 11.9183L1.82373 12.6276L9.98373 17.9493L18.3419 12.4433L17.2681 11.7431L18.1788 11.1431L18.8881 11.6057C19.4915 11.9992 19.4935 12.8822 18.892 13.2784L10.5338 18.7844C10.2015 19.0033 9.77085 19.0043 9.43746 18.7869L1.27746 13.4652C0.674148 13.0717 0.672115 12.1887 1.27361 11.7925L1.98692 11.3226L1.27746 10.8599C0.674148 10.4664 0.672115 9.58345 1.27361 9.18721L2.17113 8.59596L3.08459 9.1917L1.82373 10.0223L9.98373 15.344L18.3419 9.83805L17.0839 9.01761L10.5343 13.3321ZM9.59211 2.98938C9.84027 2.82853 10.1598 2.82853 10.408 2.98938L13.408 4.93382C13.7555 5.15911 13.8547 5.62352 13.6294 5.97111C13.4041 6.3187 12.9397 6.41784 12.5921 6.19255L10.75 4.99861V10.6187C10.75 11.033 10.4142 11.3687 10 11.3687C9.58582 11.3687 9.25003 11.033 9.25003 10.6187V4.99861L7.40795 6.19255C7.06036 6.41784 6.59596 6.3187 6.37067 5.97111C6.14538 5.62352 6.24452 5.15911 6.59211 4.93382L9.59211 2.98938Z" fill="#DDDDDD"/>
                </svg>
            ),
        },
        {
            itemType: DefaultMenuItemType.LayerDown,
            font: "layer-backward",
            svg: (
                <svg width="15" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3679 13.3321C10.0355 13.5511 9.6049 13.5521 9.2715 13.3347L1.11151 8.01295C0.508189 7.61948 0.506157 6.73649 1.10765 6.34025L9.4658 0.834285C9.79819 0.615322 10.2288 0.61433 10.5622 0.831761L18.7222 6.15348C19.3255 6.54695 19.3275 7.42994 18.726 7.82618L17.8283 8.41754L18.7221 9.00044C19.3254 9.39391 19.3275 10.2769 18.726 10.6731L10.3678 16.1791L18.0128 11.1431L18.7221 11.6057C19.3254 11.9992 19.3275 12.8822 18.726 13.2784L10.3678 18.7844C10.0354 19.0034 9.60484 19.0043 9.27144 18.7869L1.11145 13.4652C0.508132 13.0717 0.506099 12.1887 1.1076 11.7925L1.82091 11.3226L1.11145 10.8599C0.508132 10.4664 0.506099 9.58345 1.1076 9.18721L2.00516 8.59594L2.91862 9.19167L1.65771 10.0223L9.81771 15.344L18.1759 9.83805L16.9176 9.01747L10.3679 13.3321ZM9.81777 12.4971L1.65777 7.17534L10.0159 1.66937L18.1759 6.99109L9.81777 12.4971Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4081 11.2481C10.1599 11.4089 9.84041 11.4089 9.59225 11.2481L6.59225 9.30365C6.24466 9.07836 6.14552 8.61395 6.37081 8.26636C6.5961 7.91878 7.0605 7.81963 7.40809 8.04492L9.25017 9.23886V3.61873C9.25017 3.20452 9.58596 2.86873 10.0002 2.86873C10.4144 2.86873 10.7502 3.20452 10.7502 3.61873V9.23886L12.5922 8.04492C12.9398 7.81963 13.4042 7.91878 13.6295 8.26637C13.8548 8.61395 13.7557 9.07836 13.4081 9.30365L10.4081 11.2481Z" fill="white"/>
                </svg>
            ),
        }
    ];

    const getReferenceByType = (itemType:DefaultMenuItemType) => {
        return refs.find(o => o.itemType === itemType).reference;
    };

    const renderMenu = () => {
        const nodes = [];
        for (let i = 0; i < fontClasses.length; i+=2) {
            nodes.push(
                <>
                    <div
                        className={[
                            "flex-1",
                            "d-flex",
                            "flex-row",
                            "justify-content-center",
                            "py-1",
                            "default-menu",
                        ].join(" ")}
                        style={{margin: "1rem 0"}}
                    >
                        <div ref={getReferenceByType(fontClasses[i].itemType)} className="mx-1" style={{width:'12px'}}>
                            {fontClasses[i].svg}
                        </div>
                        
                        <div ref={getReferenceByType(fontClasses[i].itemType)} className="mx-1" style={{width:'12px'}}>
                            {fontClasses[i+1].svg}
                        </div>
                    </div>
                    <hr style={{margin: "0"}}></hr>
                </>
            );
        }
        return nodes;
    };
    return (
        <div
            className={[
                "d-flex",
                "flex-column",
                "justify-content-center",
            ].join(" ")}
            style={{cursor: "pointer"}}
        >
            {renderMenu()}
        </div>
    );
};

export default DefaultMenu;