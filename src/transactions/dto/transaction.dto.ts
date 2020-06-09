import { Document } from 'mongoose';

export interface TransactionDTO extends Document {
  readonly payee: string;
  readonly amount: number;
  readonly date: Date;
  readonly description: string;
}
