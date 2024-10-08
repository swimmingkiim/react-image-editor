import React from 'react';
import { v4 as guid } from 'uuid';

export type ProductPartVM = {
    img: string;
    priority: number;
    active: boolean;
};

export type ProductVM = {
    id: string;
    preview: string;
    active: boolean;
    name: string;
    parts: ProductPartVM[];
};

export type InitializeOptions = {
    originalPosition: {x:number, y: number};
    referenceWidth: number;
    referenceHeight: number;
};

export const useData = () => {
    const makeProduct = (products, options?: InitializeOptions) => {
        let productPartList = [];
        const productList = products.map((o, i) => {
            const partList = o.product_parts.map((p, j) => ({img:p.image,priority:p.priority,active:j == 0}));
            const p = o.product_parts[0];

            const printAreas = p.print_areas && p.print_areas.map(p => (
                {
                    id: guid(),
                    attrs: {
                        name: "label-target",
                        "data-item-type": "decoration",
                        x: options ? options.originalPosition.x + p.x : p.x,
                        y: options ? options.originalPosition.y + p.y : p.y,
                        width: p.w,
                        height: p.h,
                        sides: 4,
                        radius: 0,
                        scaleX: 1,
                        scaleY: 1,
                        fill: "transparent",
                        stroke: "grey",
                        strokeWidth: 1,
                        opacity: 1,
                        rotation: 0,
                        draggable: false,
                        zIndex: 1,
                    },
                    className: "sample-shape",
                    children: [],
                }
            ));

            const part = {
                id: guid(),
                attrs: {
                    name: "label-target",
                    "data-item-type": "image",
                    x: options ? options.originalPosition.x : 0,
                    y: options ? options.originalPosition.y : 0,
                    width: options ? options.referenceHeight :862,
                    height: options ? options.referenceHeight: 862,
                    src: p.image,
                    zIndex: 0,
                    brightness: 0,
                    draggable: false,
                    visible: false,
                    default: true,
                    updatedAt: Date.now(),
                },
                className: "sample-image",
                children: [],
            };

            productPartList = [...productPartList, printAreas ? {
                id: o.product_code,
                data: [part, ...printAreas]
            } : {
                id: o.product_code,
                data: [part]
            }];
            return {
                id: o.product_code,
                preview: o.image,
                name: o.product_name,
                active: i == 0,
                parts:partList,
            };
        });
    
        return {
            productList,
            productPartList
        };
    };
    
    return {
        makeProduct,
    };
};