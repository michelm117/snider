import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Action, UserInterface } from '@snider/api-interfaces';
import { User } from '../users/entities/user.entity';
import {
  AbilityBuilder,
  AbilityClass,
  buildMongoQueryMatcher,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { $nor, nor } from '@ucast/mongo2js';

export type Subjects = InferSubjects<typeof User> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;
const conditionsMatcher = buildMongoQueryMatcher({ $nor }, { nor });

@Injectable()
export class UserAbilityFactory {
  defineAbility(user: UserInterface) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);

    can(Action.Read, User);
    cannot(Action.Update, User, { id: { $ne: user.id } }).because(
      'User can only read there own note'
    );

    can(Action.Update, User);
    cannot(Action.Update, User, { id: { $ne: user.id } }).because(
      'User can only update there own note'
    );

    can(Action.Delete, User);
    cannot(Action.Delete, User, { id: { $ne: user.id } }).because(
      'User can only delete there own user'
    );

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
      conditionsMatcher,
    });
  }
}
