import React from "react";
import "./index.css";

const TeamNamesWidget:React.FC = () => {
    return (
        <div 
            className="d-flex flex-row justify-content-center align-items-center team-names py-1" 
            style={{cursor: "pointer"}}
        >
            <i className="bi bi-people me-2"></i>
            <span style={{fontSize: "0.8rem",paddingLeft: "0.2rem"}}>Add Team Names</span>
            <i className="bi bi-arrow-right ms-2"></i>
        </div>
    );
};

export default TeamNamesWidget;