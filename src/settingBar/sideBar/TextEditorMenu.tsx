
const TextEditorMenu = ({className}) => {
    return (
        <div
            className={
                [
                    "d-flex flex-column ",
                    className,
                ].join(" ")
            }
        >
            <div className="d-flex flex-row align-items-center justify-content-between">
                <i className="bi bi-type"></i>
                <span>Text</span>
                <div><i className="bi bi-x"></i></div>
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center">
                <span>Edit text applied to shirt</span>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{backgroundColor: "#777777", borderRadius: ".5rem"}}>
                <span style={{color: "white", borderRadius: ".5rem"}}>Apply</span>
            </div>
        </div>
    );
};

export default TextEditorMenu;