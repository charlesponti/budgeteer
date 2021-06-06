import { ObjectType, Field } from '@nestjs/graphql';
import { getModelForClass } from '@typegoose/typegoose';
import { EmailAddress, EmailAddressModel } from './models/EmailAddress';
import { PhoneNumber, PhoneNumberModel } from './models/PhoneNumber';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Human {
  @Field({ description: 'UID of the human' })
  _id: string;

  @Field({ description: 'Name of the human' })
  @Prop()
  name: string;

  @Field({ description: 'Unique human-readable identifier of the human' })
  @Prop()
  username: string;

  @Field({ description: 'birthday of the human' })
  @Prop()
  birthday: Date;

  @Field(() => EmailAddress, { description: 'main email address of human' })
  @Prop({ ref: EmailAddressModel })
  email_address?: EmailAddress;

  @Field(() => [EmailAddress], {
    description: 'all email addresses belonging to human',
  })
  @Prop({ default: [], ref: EmailAddressModel })
  email_addresses?: EmailAddress[];

  @Field(() => PhoneNumber, { description: 'main phone number of human' })
  @Prop({ ref: PhoneNumberModel })
  phone_number?: PhoneNumber;

  @Field(() => [PhoneNumber], {
    description: 'phone numbers belonging to human',
  })
  @Prop({ default: [], ref: PhoneNumberModel })
  phoneNumbers?: PhoneNumber[];
}

export const HumanModel = getModelForClass(Human);

export const HumanSchema = SchemaFactory.createForClass(Human);
