import { Document, Model, model, Schema } from 'mongoose';

export interface Possession extends Document {
  // name of possession
  name: string;
  // location travelled to
  price: number;
  // date item became in possession
  startDate: Date;
  // date item was no longer in possession
  endDate: Date;
  // If human currently owns item
  own: boolean;
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    own: { type: Number, required: true, default: false },
    transaction: { type: Schema.Types.ObjectId, ref: 'transactions' },
  },
  { collection: 'possessions' },
);

const Possession: Model<Possession> = model<Possession>('Possession', schema);

export default Possession;
