export class CreateNotificationScheduleDto {
  notificationPayload: string;
  scheduledDate: Date;
  status: 'pending' | 'triggered' | 'success';
  reScheduleDelayInMinutes: number;
  rescheduleCount: number;

  constructor(
    notificationPayload: string,
    scheduledDate: Date,
    status: 'pending' | 'triggered' | 'success' = 'pending',
    reScheduleDelayInMinutes: number = 0,
    rescheduleCount: number = 0,
  ) {
    this.notificationPayload = notificationPayload;
    this.scheduledDate = scheduledDate;
    this.status = status;
    this.reScheduleDelayInMinutes = reScheduleDelayInMinutes;
    this.rescheduleCount = rescheduleCount;
  }
}