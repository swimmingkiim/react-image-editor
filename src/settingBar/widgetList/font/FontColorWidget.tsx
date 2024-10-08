import React from "react";
import { Form } from "react-bootstrap";
import { SketchPicker } from "react-color";
import Overlay from 'react-bootstrap/Overlay';
import iconStyles from "../../../style/icon.module.css";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

type RectButtonProps = {
    valueColor: string;
    id: string;
};

const ColorPickerButton: React.FC<RectButtonProps> = ({ id, valueColor }) => {
    const onChange = (color) => {
        valueColor = color.hex;
    };

    const popover = (
        <Popover>
            <SketchPicker onChange={onChange}></SketchPicker>
        </Popover>
    );

    const renderButton = () => {
        if(valueColor){
            return <div style={{ width: '20px', height: '20px', backgroundColor: valueColor, border: '1px solid #000000' }}></div>;
        }else{
            return <div className={[iconStyles["diagonal-line"]].join(" ")} style={{ width: '20px', height: '20px' }}></div>;
        }
    };

    return (
        <OverlayTrigger key={id} trigger="click" placement="bottom" overlay={popover}>
            <div className="d-flex flex-row" style={{ cursor: 'pointer' }}>
                {renderButton()}
                <div className="ps-2">{valueColor}</div>
            </div>
        </OverlayTrigger>
    );
};

const FontColorWidget = ({className}) => {
    const [fillColorValue, setFillColorValue] = React.useState<string>("#ffffff");
    const [outlineColorValue, setOutlineColorValue] = React.useState<string>(null);
    return (
        <div className={className} style={{ padding: '0 15px' }}>
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <label className="form-label">Fill</label>
                    <ColorPickerButton id="fill-color" valueColor={fillColorValue}></ColorPickerButton>
                </div>

                <div>
                    <label className="form-label">Outline</label>
                    <ColorPickerButton id="outline-color" valueColor={outlineColorValue}></ColorPickerButton>
                </div>
            </div>
        </div>
    );
};

export default FontColorWidget;