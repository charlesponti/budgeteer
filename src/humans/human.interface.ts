import { Document } from 'mongoose'

export interface HumanDTO extends Document {
  readonly name: string;
  readonly username: string;
  readonly birthday: Date;
  readonly email_address: string;
  readonly email_addresses: string[];
  readonly phone_number: string;
  readonly phone_numbers: string[];
}
