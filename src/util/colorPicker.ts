import React from 'react';
import useEvent from '../hook/useEvent';

const toHex = (buffer) => Array.prototype.map.call(buffer, x => ('00' + x.toString(16)).slice(-2)).join('');

function rgba2hex(r, g, b, a) {
    if (r > 255 || g > 255 || b > 255 || a > 255)
        throw "Invalid color component";
    return (256 + r).toString(16).substr(1) +((1 << 24) + (g << 16) | (b << 8) | a).toString(16).substr(1);
}

const useColorPicker = (
    event,
    path
) => {
    const { emit } = useEvent();
    const canvas = new HTMLCanvasElement();
    const ctx = canvas.getContext('2d');
    const [ hex, setHex ] = React.useState<string>('');

    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, 1, 1).data;
        setHex(toHex(data));
        emit(event,{imageBgColor: hex});
    }
    img.src = path;

    return {
        hex
    };
};

export const emitColor = (event, image) => {
    const { emit } = useEvent();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0, 0, 1, 1).data;
    emit(event,{color: rgba2hex(data[0], data[1], data[2], data[3])});
};

export default useColorPicker;