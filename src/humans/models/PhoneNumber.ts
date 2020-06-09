import { ObjectType, Field } from '@nestjs/graphql';
import { getModelForClass } from '@typegoose/typegoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class PhoneNumber {
  @Field()
  @Prop()
  number: string;

  @Field({ description: 'carrier who provides service' })
  @Prop()
  carrier: string;

  @Field({ description: 'Is phone number still active?' })
  @Prop()
  active: boolean;
}

export const PhoneNumberModel = getModelForClass(PhoneNumber);

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);
