import { Request } from 'express';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'libs/api/core/src/lib/users/entities/user.entity';
import { UserInterface } from './user.interfaces';

export interface ExtendedRequest extends Request {
  user: User;
}
