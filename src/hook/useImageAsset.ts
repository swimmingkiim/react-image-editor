import Konva from 'konva';
import { nanoid } from 'nanoid';
import { IMAGE_LIST_KEY } from '../settingBar/widgetList/ImageWidget';
import useLocalStorage from './useLocalStorage';
import { decimalUpToSeven } from '../util/decimalUpToSeven';
import { useDispatch, useSelector } from 'react-redux';
import { imageAssetListAction, imageAssetListSelector } from '../redux/imageAssetList';

const useImageAsset = () => {
    const dispatch = useDispatch();
    const imageAssetList = useSelector(imageAssetListSelector.selectAll);
    const { getValue, setValue } = useLocalStorage();

    const setImageAsset = async (imageList: { [key: string]: any }[]) => {
        //        setValue(
        //            IMAGE_LIST_KEY,
        //            imageList.map((image) => ({
        //                type: image['data-item-type'],
        //                id: image.id,
        //                name: image.name,
        //            })),
        //        );
        //        imageList.forEach((image) => {
        //            if (!image.src) {
        //                return;
        //            }
        //            if (image.src.startsWith('data:')) {
        //                reduceImageSize(image.src, image.id);
        //                return;
        //            }
        //            setValue(`image:${image.id}`, { src: image.src });
        //        });
        imageList.map((image) => dispatch(imageAssetListAction.addItem({
            type: image['data-item-type'],
            id: image.id,
            name: image.name,
            src: image.src,
        })));
    };

    const addImageAsset = () => {
    };

    const getAllImageAsset = (): { [key: string]: any }[] => {
        //        getValue(IMAGE_LIST_KEY)?.map((image: { [key: string]: string }) => ({
        //            ...image,
        //            src: getImageAssetSrc(`image:${image.id}`),
        //        })) ?? null
        return imageAssetList;
    };

    const getImageAssetSrc = (imageId: string) => imageAssetList.find((image) => image.id === imageId)?.src ?? null;

    const reduceImageSize = (
        base64: string,
        imageId?: string,
        callback?: (src: string) => void,
    ) => {
        Konva.Image.fromURL(base64, (imageNode: Konva.Image) => {
            let width;
            let height;
            if (imageNode.width() > imageNode.height()) {
                width = decimalUpToSeven(512);
                height = decimalUpToSeven(
                    width * (imageNode.height() / imageNode.width()),
                );
            } else {
                height = decimalUpToSeven(512);
                width = decimalUpToSeven(
                    height * (imageNode.width() / imageNode.height()),
                );
            }
            imageNode.width(width);
            imageNode.height(height);
            const newBase64 = imageNode.toDataURL({
                x: 0,
                y: 0,
                width,
                height,
                pixelRatio: 1.2,
            });
            const id = imageId ?? nanoid();
            setValue(`image:${id}`, { src: newBase64 });
            if (callback) {
                callback(`find:${id}`);
            }
        });
        // const image = new Image();
        // image.onload = () => {
        //   const canvas = document.createElement("canvas");
        //   const ctx = canvas.getContext("2d");
        //   let width;
        //   let height;
        //   if (image.width > image.height) {
        //     width = decimalUpToSeven(512);
        //     height = decimalUpToSeven(width * (image.height / image.width));
        //   } else {
        //     height = decimalUpToSeven(512);
        //     width = decimalUpToSeven(height * (image.width / image.height));
        //   }
        //   canvas.width = width;
        //   canvas.height = height;
        //   image.width = width;
        //   image.height = height;
        //   ctx?.drawImage(image, 0, 0);
        //   const newBase64 = canvas.toDataURL("image/jpg", 0.2);
        //
        //   setValue(`image:${imageId}`, { src: newBase64 });
        // };
        // image.src = base64;
    };

    return {
        setImageAsset,
        addImageAsset,
        getAllImageAsset,
        getImageAssetSrc,
        reduceImageSize,
    };
};

export default useImageAsset;
