import { Types } from 'mongoose';
import { Role } from 'src/utils/roles.enum';


export class PayloadJWT {
  email: string;
  role: Role;
  sub: Types.ObjectId;
}