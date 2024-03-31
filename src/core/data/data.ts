import { type Canvas } from 'fabric'

export interface DataParams {
  prevData: Data | null
  snapshot: ReturnType<Canvas['toJSON']>
}

export interface DataProperties {
  snapshot: ReturnType<Canvas['toJSON']>
  prevData: Data | null
  nextData: Data | null
  createdAt: Date
}

export class Data implements DataProperties {
  snapshot: ReturnType<Canvas['toJSON']>
  prevData: Data | null
  nextData: Data | null
  createdAt: Date

  constructor (params: DataParams) {
    this.snapshot = params.snapshot
    this.prevData = params.prevData
    this.nextData = null
    this.createdAt = new Date()
  }

  static DEFAULT_SNAPSHOT = {
    version: '6.0.0-beta10',
    objects: []
  }

  static empty (): Data {
    return new Data({
      prevData: null,
      snapshot: Data.DEFAULT_SNAPSHOT
    })
  }
}
