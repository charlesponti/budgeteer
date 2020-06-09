import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { Human } from '../humans/humans.model';

interface FinanceDocument extends Document {
  // Name of the Human
  human: string;
}

@ObjectType()
@Schema()
export class Finance {
  @Prop({ required: true, ref: Human })
  @Field()
  human: Human
}

export const FinanceModel = getModelForClass(Finance)

export const FinanceSchema = SchemaFactory.createForClass(Finance)
