import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  controllers: [ScheduleController],
  imports: [],
  providers: [ScheduleService, PrismaService],
  exports: [],
})
export class ScheduleModule {}
