import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserAbilityFactory } from './ability/user-ability.factory';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [AuthModule, UsersModule, NotesModule],
  controllers: [],
  providers: [UserAbilityFactory],
  exports: [UsersModule, UserAbilityFactory],
})
export class AdminApiCoreModule {}
