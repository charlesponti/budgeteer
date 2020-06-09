import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectType, Field } from '@nestjs/graphql'
import { getModelForClass } from '@typegoose/typegoose';

@ObjectType()
@Schema({ timestamps: true })
export class Thought {
  @Field({ description: "the text of the thought" })
  @Prop({ required: true })
  text: string;

  @Field({ description: "where thought took place" })
  @Prop({})
  coordinates: string;
}

export const ThoughtSchema = SchemaFactory.createForClass(Thought)

export const ThoughtModel = getModelForClass(Thought)