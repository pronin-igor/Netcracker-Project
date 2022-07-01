import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  mail: string;
  @Prop()
  password: string;
  @Prop()
  basket: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);