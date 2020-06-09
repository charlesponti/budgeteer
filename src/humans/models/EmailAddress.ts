import { ObjectType, Field } from '@nestjs/graphql';
import { getModelForClass } from '@typegoose/typegoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class EmailAddress {
  @Field({ description: 'email address' })
  @Prop()
  address: string;

  @Field({ description: 'email service provider' })
  @Prop()
  provider: string;

  @Field({ description: 'Is email address still active?' })
  @Prop()
  active: boolean;
}

export const EmailAddressModel = getModelForClass(EmailAddress);

export const EmailAddressSchema = SchemaFactory.createForClass(EmailAddress);
