import { useDispatch, useSelector } from "react-redux";
import { workspaceColorActions, workspaceColorSelector } from "../redux/workspaceColor";

const useWorkspaceColor = () => {
    const dispatch = useDispatch();
    const workspaceColorList = useSelector(workspaceColorSelector.selectAll);

    const changeColor = (color:string) => {
        dispatch(workspaceColorActions.changeColor(color));
    };

    return {
        changeColor,
    };
};

export default useWorkspaceColor;