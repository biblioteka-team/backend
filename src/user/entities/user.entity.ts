import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/utils/roles.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, enum: Role, default: Role.User })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
