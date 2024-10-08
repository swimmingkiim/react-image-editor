import React from "react";
import "react-dropzone/examples/theme.css";
import FontFormatWidget from "./FontFormatWidget";
import FontColorWidget from "./FontColorWidget";
import FontTransformWidget from "./FontTransformWidget";
import TextEditWidget from "./TextEditWidget";

export type FontWidgetProps = {
    createTextItem: () => void;
};

const FontWidget: React.FC<FontWidgetProps> = ({createTextItem}) => {
    return (
        <div>
            <TextEditWidget createTextItem={createTextItem}></TextEditWidget>
            <hr className="m-0"></hr>
        </div>
    );
};

export default FontWidget;
