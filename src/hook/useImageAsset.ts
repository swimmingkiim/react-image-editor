import Konva from "konva";
import { nanoid } from "nanoid";
import { decimalUpToSeven } from "../util/decimalUpToSeven";
import { useDispatch, useSelector } from "react-redux";
import { imageAssetListAction, imageAssetListSelector } from "../redux/imageAssetList";

const useImageAsset = () => {
  const dispatch = useDispatch();
  const imageAssetList = useSelector(imageAssetListSelector.selectAll);

  const setImageAsset = async (imageList: { [key: string]: any }[]) => {
    imageList.map((image) =>
      dispatch(
        imageAssetListAction.addItem({
          type: image["data-item-type"],
          id: image.id,
          name: image.name,
          src: image.src,
        }),
      ),
    );
  };

  const getAllImageAsset = (): { [key: string]: any }[] => {
    return imageAssetList;
  };

  const getImageAssetSrc = (imageId: string) =>
    imageAssetList.find((image) => image.id === imageId)?.src ?? null;

  const reduceImageSize = (base64: string, imageId?: string, callback?: (src: string) => void) => {
    Konva.Image.fromURL(base64, (imageNode: Konva.Image) => {
      let width;
      let height;
      if (imageNode.width() > imageNode.height()) {
        width = decimalUpToSeven(512);
        height = decimalUpToSeven(width * (imageNode.height() / imageNode.width()));
      } else {
        height = decimalUpToSeven(512);
        width = decimalUpToSeven(height * (imageNode.width() / imageNode.height()));
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
      if (callback) {
        callback(`find:${id}`);
      }
    });
  };

  return {
    setImageAsset,
    getAllImageAsset,
    getImageAssetSrc,
    reduceImageSize,
  };
};

export default useImageAsset;
