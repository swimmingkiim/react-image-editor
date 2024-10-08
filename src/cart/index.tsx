import "./index.css";
import useI18n from "../hook/usei18n";
import React, { CSSProperties, useRef } from "react";
import { Overlay, Tooltip } from 'react-bootstrap';
import ProductSelect from "./product";
import { TabKind } from "../tab/Tab";
import useEvent from "../hook/useEvent";
import { EventName } from "../config/constants";
import ColorPicker from "./color";

export type CartViewProps = {
    items: TabKind[];
    onItemAdd?: () => void;
    onItemClose?: (item: TabKind) => void;
    onItemSelect?: (e: React.MouseEvent<any, MouseEvent>, item: TabKind) => void;
};

const CartView : React.FC<CartViewProps> = ({items, onItemAdd, onItemClose, onItemSelect}) => {
    const { getTranslation } = useI18n();
    const [ showProductItems, toggleProductItems ] = React.useState(false);
    const [ showColorPicker, toggleColorPicker ] = React.useState(false);
    const activedItemRef = useRef(null);
    const activedColorRef = useRef(null);
    const [ itemSelectStyle, setItemSelectStyle ] = React.useState({height: "19rem"} as CSSProperties);
    const [ colorPickerStyle, setColorPickerStyle ] = React.useState({} as CSSProperties);

    const overlays = [
        {
            key: "ActivedItemKey",
            target: activedItemRef.current,
            show: showProductItems,
            component: <ProductSelect items={items} style={itemSelectStyle} onItemAdd={onItemAdd} onItemClose={onItemClose} onItemSelect={(e, item) => {
                if(onItemSelect) {
                    onItemSelect(e, item);
                }
            }}/>
        },
        {
            key: "ActivedColorKey",
            target: activedColorRef.current,
            show: showColorPicker,
            component: <ColorPicker activedProduct={items.find(o => o.active)} style={colorPickerStyle}/>
        }
    ];

    // const callback = (entries) => {
    //     entries.forEach((entry) => {
    //         if(entry.isIntersecting) {
    //             setItemSelectStyle({width: `${entry.boundingClientRect.width}px`, ...itemSelectStyle});
    //         }
    //     });
    // };

    document.addEventListener("mousedown", (e) => {
        if(activedItemRef.current && !activedItemRef.current.contains(e.target as Node)) {
            toggleProductItems(false);
        }
        if(activedColorRef.current && !activedColorRef.current.contains(e.target as Node)) {
            toggleColorPicker(false);
        }
    });

    React.useEffect(() => {
        if(items.length <= 0) return;
        
        setItemSelectStyle({width: `${activedItemRef.current.offsetWidth}px`, ...itemSelectStyle});
        setColorPickerStyle({width: `${activedItemRef.current.offsetWidth}px`, transform: `translateX(45%)`,...colorPickerStyle});
    }, [items]);

    const activedItemRender = () => (
        <label>{items.length > 0 && items.find(o => o.active).name}</label>
    );
    return (
        <div>
            {overlays.map((item) => {
                return <Overlay target={item.target} show={item.show} placement="top">
                    {({
                        placement: _placement,
                        arrowProps: _arrowProps,
                        show: _show,
                        popper: _popper,
                        hasDoneInitialMeasure: _hasDoneInitialMeasure,
                        ...props
                    }) => (
                        <div {...props} style={{zIndex: 1, ...props.style}}>{item.component}</div>
                    )}
                </Overlay>
            })}
            <div className="d-flex flex-row cart-view">
                <section className="color-section" ref={activedColorRef} onClick={() => toggleColorPicker(!showColorPicker)}>
                    <div className="roundLG bg-white"></div>
                </section>
                <section className="products-selector" ref={activedItemRef} onClick={() => toggleProductItems(!showProductItems)}>
                    <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="i-cloth">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.23554 0.375231C7.30598 0.375527 7.37612 0.375822 7.44584 0.375822C7.65494 0.375822 7.8502 0.480395 7.96608 0.654454C8.37422 1.26747 8.95202 1.54221 9.5 1.54221C10.048 1.54221 10.6258 1.26747 11.0339 0.654454C11.1498 0.480395 11.3451 0.375822 11.5542 0.375822C11.6239 0.375822 11.694 0.375527 11.7645 0.375231C12.297 0.372995 12.8463 0.370689 13.3577 0.495093C13.9851 0.64775 14.539 0.979657 15.0762 1.61159C15.0805 1.61659 15.0846 1.62167 15.0887 1.62681L18.4887 5.89216C18.5999 6.03165 18.6462 6.21201 18.6159 6.38781C18.5857 6.56361 18.4817 6.71809 18.3303 6.81235C18.1439 6.92835 17.9031 7.07834 17.6303 7.24823C16.5973 7.89167 15.1056 8.82074 14.375 9.27115V14C14.375 14.3452 14.0952 14.625 13.75 14.625H5.17917C4.83399 14.625 4.55417 14.3452 4.55417 14V9.26941C4.12374 9.00021 3.42995 8.55956 2.72521 8.11196C1.93536 7.6103 1.13176 7.09991 0.669749 6.81235C0.5183 6.71809 0.414347 6.56361 0.384071 6.38781C0.353796 6.21201 0.400083 6.03165 0.511275 5.89216L3.91128 1.62681C3.91537 1.62167 3.91955 1.61659 3.9238 1.61159C4.46098 0.979657 5.01491 0.64775 5.64236 0.495093C6.15367 0.370689 6.70298 0.372995 7.23554 0.375231ZM5.80417 8.91129V5.46928C5.80417 5.12411 5.52435 4.84428 5.17917 4.84428C4.83399 4.84428 4.55417 5.12411 4.55417 5.46928V7.79213C4.21326 7.57636 3.82191 7.32773 3.42452 7.07527C2.90124 6.74284 2.36751 6.40377 1.92475 6.12431L4.88235 2.41396C5.26341 1.96796 5.5932 1.79352 5.93786 1.70966C6.268 1.62934 6.62598 1.62472 7.13053 1.62536C7.75149 2.388 8.61376 2.79221 9.5 2.79221C10.3862 2.79221 11.2485 2.388 11.8695 1.62536C12.374 1.62472 12.732 1.62934 13.0621 1.70966C13.4068 1.79352 13.7366 1.96796 14.1177 2.41396L17.0737 6.12231C17.0379 6.14458 17.0015 6.16724 16.9646 6.19026C16.1844 6.67617 15.148 7.32172 14.375 7.80119V5.46928C14.375 5.12411 14.0952 4.84428 13.75 4.84428C13.4048 4.84428 13.125 5.12411 13.125 5.46928V8.91128C13.1249 8.91838 13.1249 8.92549 13.125 8.93261V13.375H5.80417V8.9326C5.80429 8.92549 5.80429 8.91839 5.80417 8.91129Z" fill="#888888"></path>
                    </svg>
                    {activedItemRender()}
                    <svg width="5" height="3" viewBox="0 0 5 3" fill="none" xmlns="http://www.w3.org/2000/svg" className="i-arrow">
                        <path d="M4.66357 3L0.336431 3C0.0370801 3 -0.112596 2.61755 0.0993046 2.39342L2.26203 0.104062C2.39321 -0.0346874 2.60679 -0.0346874 2.73797 0.104061L4.9007 2.39342C5.1126 2.61755 4.96292 3 4.66357 3Z" fill="#DDDDDD"></path>
                    </svg>
                </section>
                <section className="checkout-section">
                    <label>{getTranslation("cartview", "checkout", "name")}</label>
                    <div>
                        <svg width="14" height="14" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.875 0.125C6.01562 0.125 7.75 1.85937 7.75 4C7.75 6.14062 6.01562 7.875 3.875 7.875C1.73438 7.875 -7.58119e-08 6.14062 -1.69382e-07 4C-2.62951e-07 1.85938 1.73437 0.125 3.875 0.125ZM5.65469 3.73437L3.5375 1.61719C3.39062 1.47031 3.15312 1.47031 3.00781 1.61719L2.74219 1.88281C2.59531 2.02969 2.59531 2.26719 2.74219 2.4125L4.32969 4L2.74219 5.5875C2.59531 5.73437 2.59531 5.97187 2.74219 6.11719L3.00781 6.38281C3.15469 6.52969 3.39219 6.52969 3.5375 6.38281L5.65469 4.26562C5.80156 4.11875 5.80156 3.88125 5.65469 3.73437Z" fill="#DDDDDD"></path>
                        </svg>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CartView;