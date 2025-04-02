import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/utils/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({
    description: 'The username of the user',
    example: 'user',
  })
  @Prop({ required: true })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'admin@example.com',
    required: true,
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @Prop({ required: true })
  password: string;

  @Prop({ required: false, enum: Role, default: Role.User })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
