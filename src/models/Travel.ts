import { Document, Model, Schema, model } from 'mongoose';

enum TransportationTypes {
  WALKING,
  TAXI,
  PUBLIC,
  CAR,
  PLANE,
}
interface TripDocument extends Document {
  // name of place
  name: string;
  // location travelled to
  location: string;
  start_location: string;
  end_location: string;
  transportation_type: TransportationTypes;
  // date human arrived at location
  arrive: Date;
  // date human departed location
  depart: Date;
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    arrive: { type: Date, required: false },
    depart: { type: Date, required: false },
  },
  { collection: 'trips' },
);

// TODO wishList: Query for { arrive: undefined }

export type ITrip = Model<TripDocument>;

export const TripModel: Model<TripDocument> = model<TripDocument>(
  'Trip',
  schema,
);
