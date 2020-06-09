import { Document } from 'mongoose'

export interface ExpenseDocument extends Document {
  payee: string
  cost: number
  billingDay: string
  billingPeriod: string
  joined?: Date
  account: string
  category: string
  active: boolean
  nextBillingDate(date: string): any
}