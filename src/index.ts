import canvasModules from "./core/canvas";
import dataModules from "./core/data";
import historyModules from "./core/history";
import tabModules from "./core/tab";
import editableObjectModules from "./core/editableObject";

const modules = {
  ...canvasModules,
  ...dataModules,
  ...historyModules,
  ...tabModules,
  ...editableObjectModules,
};

export default modules;
