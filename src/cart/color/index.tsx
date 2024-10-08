import { CSSProperties } from "react";
import "./index.css";
import { TabKind } from "../../tab/Tab";
import React from "react";

export type ColorPickerProps = {
    activedProduct: TabKind;
    style?: CSSProperties;
    onColorSelect?: (color: string) => void;
};

const colorList = [
    {
        color: "#FFFFFF",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
            "2XL",
            "3XL",
        ],
    },
    {
        color: "#A6A5A1",
        sizeList: [
            "S",
            "M",
            "L",
            "3XL",
        ],
    },
    {
        color: "#A4A4A4",
        sizeList: [
            "XL",
            "2XL",
            "3XL",
        ],
    },
    {
        color: "#6F6E6B",
        sizeList: [
            "M",
            "L",
            "XL",
            "2XL",
            "3XL",
        ],
    },
    {
        color: "#404040",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
            "2XL",
            "3XL",
        ],
    },
    {
        color: "#2E2E32",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
            "2XL",
            "3XL",
        ],
    },
    {
        color: "#000000",
        sizeList: [
            "XL",
            "2XL",
            "3XL",
        ],
    },
    {
        color: "#26262E",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
        ],
    },
    {
        color: "#414147",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
        ],
    },
    {
        color: "#303B61",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
            "2XL",
        ],
    },
    {
        color: "#29326D",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
        ],
    },
    {
        color: "#0092B8",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
        ],
    },
    {
        color: "#97ADBD",
        sizeList: [
            "M",
            "L",
            "XL",
        ],
    },
    {
        color: "#CDEADD",
        sizeList: [
            "L",
            "XL",
            "2XL",
            "3XL",
        ],
    },
    {
        color: "#DC94B3",
        sizeList: [
            "M",
            "L",
            "XL",
            "2XL",
        ],
    },
    {
        color: "#A3172A",
        sizeList: [
            "S",
            "M",
            "L",
            "XL",
            "2XL",
            "3XL",
        ],
    },
];

const ColorPicker:React.FC<ColorPickerProps> = ({activedProduct, style, onColorSelect}) => {
    const [ selectedSize, setSelectedSize ] = React.useState(colorList[0].sizeList);
    return (
        <div className="color-picker-root" style={style}>
            <div className="hstack color-picker-header">
                <div className="text-truncate color-picker-title">{activedProduct.name}</div>
                <div className="color-picker-close">
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.585 6L10.7122 2.87281C11.0959 2.48906 11.0959 1.86687 10.7122 1.48281L10.0172 0.787813C9.63344 0.404063 9.01125 0.404063 8.62719 0.787813L5.5 3.915L2.37281 0.787813C1.98906 0.404063 1.36688 0.404063 0.982813 0.787813L0.287813 1.48281C-0.0959375 1.86656 -0.0959375 2.48875 0.287813 2.87281L3.415 6L0.287813 9.12719C-0.0959375 9.51094 -0.0959375 10.1331 0.287813 10.5172L0.982813 11.2122C1.36656 11.5959 1.98906 11.5959 2.37281 11.2122L5.5 8.085L8.62719 11.2122C9.01094 11.5959 9.63344 11.5959 10.0172 11.2122L10.7122 10.5172C11.0959 10.1334 11.0959 9.51125 10.7122 9.12719L7.585 6Z" fill="#777777"></path>
                    </svg>
                </div>
            </div>
            <div className="color-picker-body">
                <div className="container">
                    <div className="row gx-1 gy-1">
                        {colorList.map((color) => (
                            <div className="col-1 color-item-container" style={{backgroundColor: color.color}} onMouseEnter={() => {
                                setSelectedSize(color.sizeList);
                            }} onClick={() => onColorSelect(color.color)}></div>
                        ))}
                    </div>
                </div>
                <div className="container mt-2">
                    <hr />
                </div>
                <div className="container">
                    <h2>Sizes by colour</h2>
                    <div className="size-availability">
                        {selectedSize.map(size => {
                            return (
                                <div>{size}</div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;