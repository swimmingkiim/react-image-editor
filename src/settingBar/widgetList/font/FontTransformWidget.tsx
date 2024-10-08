import React from "react";
import "./FontTransformWidget.css";

const FontTransformWidget = ({className}) => {
    const [rotation, setRotation] = React.useState<number>(25);
    return (
        <div className={[className, "font-transform-widget"].join(" ")} style={{ padding: '0 15px' }}>
            <div className="mb-3">
                <label className="form-label">Rotation</label>
                <input 
                    type="range" 
                    className="form-range" 
                    min="0" 
                    max="360" 
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                />
            </div>
        </div>
    );
};

export default FontTransformWidget;