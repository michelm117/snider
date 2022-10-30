import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

import * as bcrypt from 'bcrypt';

/**
 * LocalStrategy is used to log user in. It validates the credentials and
 * returns the authenticated user.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Define the username field in the constructor.
   * @param usersService
   */
  constructor(private usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  /**
   * Validate email and password.
   * @param {string} email
   * @param {string} password
   * @returns  Promise<User>
   */
  async validate(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findOneByEmailOrFail(email);
      if (!user) {
        throw new UnauthorizedException('Email or password is incorrect');
      }
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new UnauthorizedException('Email or password is incorrect');
      }

      return user;
    } catch (err: any) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
  }
}
