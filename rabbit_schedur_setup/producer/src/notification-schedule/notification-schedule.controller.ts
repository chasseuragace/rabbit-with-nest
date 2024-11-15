import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { NotificationScheduleService } from './notification-schedule.service';
import { CreateNotificationScheduleDto } from './dto/create-notification-schedule.dto';

@Controller('notification-schedule')
export class NotificationScheduleController {
  constructor(private readonly service: NotificationScheduleService) {}

  @Post()
  async scheduleNotification(@Body() dto: CreateNotificationScheduleDto) {
    return this.service.scheduleNotification(dto);
  }

  @Get()
  async listScheduledNotifications() {
    return this.service.listScheduledNotifications();
  }

  @Delete(':id')
  async deleteScheduledNotification(@Param('id') id: number) {
    return this.service.deleteScheduledNotification(id);
  }
}