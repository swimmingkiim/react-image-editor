import React from "react";
import "./ClipartMenu.css";
import cliparts from "../../config/clipart.json";

const ClipartMenu:React.FC = () => {
    const onClick = (id) => {

    };
    return (
        <div 
            className="d-flex flex-column justify-content-center w-100"
            style={{padding: ".5rem"}}
        >
            <div className="d-flex flex-row justify-content-center align-items-center clipart-form">
                <label>
                    <i className="bi bi-search"></i>
                </label>
                <input className="clipart-input" placeholder="Browse Clipart"></input>
            </div>
            <div className="row" style={{padding: "0.4rem"}}>
                {cliparts.map((clipart, index) => (
                    <>
                        <div
                            key={index}
                            className="col items-align-center justify-content-center d-flex m-1"
                            style={{height: "4.5rem", fontSize: ".8rem", border: "1px solid #ccc", borderRadius: ".2rem", cursor: "pointer"}}
                            onClick={() => onClick(clipart.id)}
                        >
                            <span className="m-auto">{clipart.name}</span>
                        </div>
                        {index%2 === 1 && <div className="w-100"></div>}
                    </>
                ))}
            </div>
        </div>
    );
};

export default ClipartMenu;