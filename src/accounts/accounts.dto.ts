import { Document } from 'mongoose'

export interface AccountDTO extends Document {
  readonly name: string
  readonly accountName: string
  readonly routingNumber: string
  readonly human: string
  readonly balance: number
  readonly active: boolean
  readonly currency: string
  readonly type: string
}
