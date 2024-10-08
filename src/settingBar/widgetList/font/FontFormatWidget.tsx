import React, { CSSProperties } from "react";
import { IFontSettings } from "./IFontSettings";
import { div } from "@tensorflow/tfjs-core";
import { Col, Dropdown, Row } from "react-bootstrap";
import "./FontFormatWidget.css";

const FontFormatWidget = ({ className }) => {
    const [alignment, setAlignment] = React.useState('left');
    const [fontSettings, setFontSettings] = React.useState<IFontSettings & CSSProperties>({
        font: 'Helvetica',
        size: 19,
        alignment: 'left',
        border: '1px solid rgba(255, 255, 255, 0.06)',
    });
    const [font, setFont] = React.useState("Helvetica");
    
    const handleAlignmentChange = (align: string) => {
        setAlignment(align);
    };
    return (
        <div className={className} style={{ padding: '0 18px 1rem 18px', margin: '1rem 0 0 0', display: 'block' }}>
            <div>
                <Dropdown as="div" style={{ margin: "0 0 1px 0", backgroundColor: "rgba(255,255,255,0)", cursor: "pointer" }}>
                    <Dropdown.Toggle as="div">{font}</Dropdown.Toggle>
                    <Dropdown.Menu as="div">
                        <Dropdown.Item as="div" active>Helvetica</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div></div>
            </div>

            <Row as="div" style={{fontFamily: "Roboto, sans-serif", fontWeight: "300"}}>
                <Col as="div" className="col-6">
                    <div className="font-selector">
                        <div>13</div>
                        <div className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
                                <path d="M1 1L4 4L7 1" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </Col>
                {/* <input
                    type="number" 
                    className="form-control bg-dark text-light"
                    style={{ width: '60px' }}
                    value={fontSettings.size}
                    onChange={(e) => setFontSettings({...fontSettings, size: parseInt(e.target.value)})}
                /> */}
                <Col className="col-6 font-size-btn-group">
                    <div className="btn" onClick={() => setFontSettings({...fontSettings, alignment: 'left'})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                            <path d="M0.5 0.5H13.5M6.5 4.5L13.5 4.5M4.5 8.5L13.5 8.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="btn" onClick={() => setFontSettings({...fontSettings, alignment: 'center'})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                            <path d="M0.5 0.5H13.5M3.5 4.5L10.5 4.5M2.5 8.5L11.5 8.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="btn" onClick={() => setFontSettings({...fontSettings, alignment: 'right'})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
                            <path d="M1 0.5H14M1 4.5L8 4.5M1 8.5L10 8.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default FontFormatWidget;