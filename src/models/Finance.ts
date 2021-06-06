import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { Human, HumanModel } from '../humans/humans.model';

interface FinanceDocument extends Document {
  // Name of the Human
  human: string;
}

@ObjectType()
@Schema()
export class Finance {
  @Prop({ required: true, ref: HumanModel })
  @Field()
  human: Human
}

export const FinanceModel = getModelForClass(Finance)

export const FinanceSchema = SchemaFactory.createForClass(Finance)
