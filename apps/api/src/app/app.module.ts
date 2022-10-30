import { ConfigModule } from '@nestjs/config';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import {
  AllExceptionsFilter,
  AuthModule,
  DatabaseModule,
  UsersModule,
} from '@snider/api/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NotesModule } from 'libs/api/core/src/lib/notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      // Enable globale ClassSerializerInterceptor to only return exposed
      // variables
      // https://stackoverflow.com/questions/55720448/nestjs-how-to-setup-classserializerinterceptor-as-global-interceptor
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
