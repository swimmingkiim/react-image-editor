
const useEvent = () => {
    const on = (event, callback) => {
        document.addEventListener(event, (e) => callback(e.detail));
    };

    const emit = (event, data) => {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    };

    const remove = (event, callback?) => {
        document.removeEventListener(event, callback);
    };

    return {
        on,
        emit,
        remove,
    };
};

export default useEvent;