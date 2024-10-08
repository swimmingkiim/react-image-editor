import widget from "./widget.json";
import hotkey from "./hotkey.json";
import cartview from "./cartview.json";
import workMode from "../../../config/workMode.json";

export default {
  widget,
  hotkey,
  cartview,
  workMode: workMode.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
};
