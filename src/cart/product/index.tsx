import { ListGroup, Row, Stack } from "react-bootstrap";
import { EventName } from "../../config/constants";
import useEvent from "../../hook/useEvent";
import { TabKind } from "../../tab/Tab";
import "./index.css";
import React, { CSSProperties } from "react";

export type ProductSelectProps = {
    items: TabKind[];
    style?: CSSProperties;
    onItemAdd?: () => void;
    onItemSelect?: (e: React.MouseEvent<any, MouseEvent>,item: TabKind) => void;
    onItemClose?: (item: TabKind) => void;
};

const ProductSelect: React.FC<ProductSelectProps> = ({items, style, onItemAdd, onItemSelect, onItemClose}) => {
    const [ showClose, toggleShowClose ] = React.useState(-1);
    const closeRef = React.useRef(null);
    return (
        <div className="product-root" style={style}>
            <ListGroup as="ul" className="product-list">
                <ListGroup.Item action key="product-header-id" as="li" className="product-header" onClick={() => onItemAdd()}>
                    <div className="hstack w-100">
                        <label className="me-auto">Product</label>
                        <div className="i-plus">+</div>
                    </div>
                </ListGroup.Item>
                {items.map((item,index) => {
                    return (
                        <ListGroup.Item
                            action
                            key={`product-item-${item.id}`}
                            as="li" 
                            className="product-item"
                            data-file-id={item.id}
                            data-active={item.active}
                            onMouseEnter={() => toggleShowClose(index)} 
                            onMouseLeave={() => toggleShowClose(-1)}
                            onClick={(e) => {
                                if(closeRef.current && !closeRef.current.contains(e.target)){
                                    if(onItemSelect) {
                                        onItemSelect(e, item);
                                    }
                                }
                            }}
                        >
                            <div className="hstack w-100">
                                <img src={item.preview} className="h-100"/>
                                <label className="text-truncate me-auto">{item.name}</label>
                                {showClose === index && <div className="i-close" onClick={() => {
                                    if(onItemClose){
                                        onItemClose(item);
                                    }
                                }} ref={closeRef}>x</div>}
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default ProductSelect;