import React from "react";
import FontFormatWidget from "./FontFormatWidget";
import "./TextEditWidget.css";

export type TextEditWidgetProps = {
    createTextItem: () => void;
};

const TextEditWidget:React.FC<TextEditWidgetProps> = ({createTextItem}) => {
    const [ show, toggleShow ] = React.useState(false);
    const handleToggle = () => {
        createTextItem();
        toggleShow(!show);
    };
    
    return (
        <>
            <div className="text-accordion" onClick={handleToggle}>
                <h2>Text</h2>
                <span className="i-plus">+</span>
            </div>
            {show && <FontFormatWidget className="mt-1"></FontFormatWidget>}
        </>
    );
};

export default TextEditWidget;