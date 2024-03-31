import { Canvas } from 'fabric'
import { type EditableObject } from '../editableObject/editableObject'
import { Tab } from '../tab/tab'

export type CanvasState = Tab[]

export interface CanvasParams {
  fabricCanvasOptions: Record<string, any>
  initialState?: CanvasState
  initialTabId?: Tab['id']
}

export interface CanvasProperties {
  fabricCanvasOptions: Record<string, any>

  _fabricCanvas: Canvas
  _canvasElement: HTMLCanvasElement
  _state: CanvasState
  tabId: Tab['id']
}

export interface CanvasMethods {
  _addHistoryListener: () => void
  import: (json: ReturnType<JSON['parse']>) => Promise<void>
  export: () => ReturnType<JSON['parse']>
  addObject: (object: EditableObject) => void
  undo: () => void
  redo: () => void
}

export class ReactImageEditor implements CanvasProperties, CanvasMethods {
  fabricCanvasOptions: Record<string, any>

  _fabricCanvas: Canvas
  _canvasElement: HTMLCanvasElement
  _state: CanvasState
  tabId: Tab['id']

  constructor (params: CanvasParams) {
    this.fabricCanvasOptions = params.fabricCanvasOptions
    this._state = params.initialState ?? [Tab.empty()]
    this.tabId = params.initialTabId ?? this._state[0].id
    this._canvasElement = document.createElement('canvas')
    this._canvasElement.id = ReactImageEditor.REACT_IMAGE_EDITOR__CANVAS_ID
    this._fabricCanvas = new Canvas(
      this._canvasElement,
      params.fabricCanvasOptions
    )
    this._addHistoryListener()
  }

  static REACT_IMAGE_EDITOR__CANVAS_ID = '__react-image-editor__canvas'
  static REACT_IMAGE_EDITOR__CONTAINER_ID = '__react-image-editor__container'

  get fabricCanvas (): Canvas {
    return this._fabricCanvas
  }

  get canvasElement (): HTMLCanvasElement {
    return this._canvasElement
  }

  get state (): CanvasState {
    return this._state
  }

  get currentTab (): Tab {
    const currentTab = this.state.find((tab) => tab.id === this.tabId)
    if (!currentTab) {
      throw Error('ReactImageEditor:currentTab: Can\'t find current tab with given current tab id')
    }
    return currentTab
  }

  _addHistoryListener (): void {
    this.fabricCanvas.on('object:modified', (_) => {
      const newSnapshot = this.fabricCanvas.toJSON()
      this.currentTab.addHistory(newSnapshot)
    })
  }

  async import (json: any): Promise<void> {
    await this.fabricCanvas.loadFromJSON(json)
    this.fabricCanvas.renderAll()
  }

  export () {
    return this.fabricCanvas.toJSON()
  }

  addObject (object: EditableObject) {
    this.fabricCanvas.add(object.fabricInstance)
    const newSnapshot = this.fabricCanvas.toJSON()
    this.currentTab.addHistory(newSnapshot)
  }

  async undo (): Promise<void> {
    this.currentTab.history.goPrev()
    await this.fabricCanvas.loadFromJSON(this.currentTab.getFabricJSON())
    this.fabricCanvas.renderAll()
  }

  async redo (): Promise<void> {
    this.currentTab.history.goNext()
    await this.fabricCanvas.loadFromJSON(this.currentTab.getFabricJSON())
    this.fabricCanvas.renderAll()
  }
}
