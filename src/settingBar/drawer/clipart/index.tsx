import { Offcanvas } from "react-bootstrap";
import colorStyles from "../../../style/color.module.css";
import positionStyles from "../../../style/position.module.css";
import Overlay from 'react-bootstrap/Overlay';
import Stack from 'react-bootstrap/Stack';
import { MutableRefObject } from "react";

export type ClipartDrawerProps = {
    show: boolean;
    target: MutableRefObject<any>;
    handleClose?: () => void;
};

const ClipartDrawer:React.FC<ClipartDrawerProps> = ({show, handleClose, target}) => {
    return (
        <Overlay target={target.current} placement="right" show={show}>
            {(props) => (
                <div {...props} style={{backgroundColor: "red"}}>
                    Simple tooltip
                </div>
            )}
        </Overlay>
    );
};

export default ClipartDrawer;