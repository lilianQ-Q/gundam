import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/common/guards';
import { ConfigModule } from '@nestjs/config';
import { SiteController } from './site/site.controller';
import { SiteService } from './site/site.service';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [AppController, SiteController, GroupController],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard
  }, SiteService, GroupService],
})
export class AppModule {}
