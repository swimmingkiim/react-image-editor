import { v4 as uuid } from "uuid";
import { History } from "../history/history";
import { Data } from "../data/data";

export interface TabParams {
  name?: string;
  initialHistory: History;
}

export interface TabProperties {
  id: string;
  name: string;
  history: History;
}

export interface TabMethods {
  getCurrentData: () => Data;
  getFabricJSON: () => Data["snapshot"];
  addHistory: (newSnapshot: Data["snapshot"]) => void;
}

export class Tab implements TabProperties, TabMethods {
  id: string;
  name: string;
  history: History;

  constructor(params: TabParams) {
    this.id = uuid();
    this.name = params.name ?? "tab";
    this.history = params.initialHistory;
  }

  static empty() {
    return new Tab({
      initialHistory: History.empty(),
    });
  }

  getCurrentData(): Data {
    return this.history.pointer;
  }

  getFabricJSON(): Data["snapshot"] {
    return this.history.pointer.snapshot;
  }

  addHistory(newSnapshot: Data["snapshot"]): void {
    const newData = new Data({
      snapshot: newSnapshot,
      prevData: this.getCurrentData(),
    });
    this.history.push(newData);
  }
}
