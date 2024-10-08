import React from "react";
import useEvent from "../useEvent";

const useCompRect = (event) => {
    const { on, emit, remove } = useEvent();
    const ref = React.useRef(null);

    React.useLayoutEffect(() => {
        const observeTarget = ref.current;
        if (!observeTarget) return;
    
        const resizeObserver = new ResizeObserver((entries) => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          const { x, y, width, height } = entries[0].contentRect;
          emit(event, { x, y, width, height });
        });
    
        resizeObserver.observe(observeTarget);
    
        return () => {
          resizeObserver.disconnect();
          remove(event);
        };
    }, []);

    const onEvent = (callback) => {
        on(event, callback);
    };
    return {
        ref,
        onEvent,
    };
};

export default useCompRect;

