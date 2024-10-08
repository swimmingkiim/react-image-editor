import { Rect } from "react-konva";
import { OverrideItemProps } from "../../../hook/useItem";
import { StageData } from "../../../redux/currentStageData";

export type PrintAreaItemProps = OverrideItemProps<{
    data: StageData;
  }>;

const PrintAreaItem: React.FC<PrintAreaItemProps> = ({
    data
}) => {
    const { attrs } = data;
    return (
        <Rect
            x={attrs.x}
            y={attrs.y}
            width={attrs.width}
            height={attrs.height}
            stroke={attrs.stroke ?? null}
            strokeWidth={1}
            dash={[10, 5]}
            fill="transparent"
        />
    );
};

export default PrintAreaItem;