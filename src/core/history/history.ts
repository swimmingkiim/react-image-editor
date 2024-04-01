import { Data } from "../data/data";

export interface HistoryParams {
  initialData: Data;
}

export interface HistoryProperties {
  pointer: Data;
}

export interface HistoryMethods {
  goPrev: () => void;
  goNext: () => void;
  push: (data: Data) => void;
}

export class History implements HistoryProperties, HistoryMethods {
  pointer: Data;

  constructor(params: HistoryParams) {
    this.pointer = params.initialData;
  }

  static empty(): History {
    return new History({
      initialData: Data.empty(),
    });
  }

  goPrev(): void {
    const prevData = this.pointer.prevData;
    if (prevData) {
      this.pointer = prevData;
    }
  }

  goNext(): void {
    const nextData = this.pointer.nextData;
    if (nextData) {
      this.pointer = nextData;
    }
  }

  push(data: Data): void {
    this.pointer.nextData = data;
    this.pointer = this.pointer.nextData;
  }
}
