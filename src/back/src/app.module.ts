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
import { NestjsFormDataModule } from 'nestjs-form-data';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';
import { ReportController } from './report/report.controller';
import { ReportService } from './report/report.service';
import { ReportSiteService } from './report-site/report-site.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NestjsFormDataModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, SiteController, GroupController, StatusController, ReportController],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard
  }, SiteService, GroupService, StatusService, ReportService, ReportSiteService],
})
export class AppModule {}
