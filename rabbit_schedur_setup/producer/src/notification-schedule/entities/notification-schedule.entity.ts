import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum NotificationStatus {
  PENDING = 'pending',
  TRIGGERED = 'triggered',
  SUCCESS = 'success',
}

@Entity()
export class NotificationSchedule {
  @PrimaryGeneratedColumn()
  id!: number;  // Use the non-null assertion operator

  @Column()
  notificationPayload: string;

  @Column()
  scheduledDate: Date;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Column({ nullable: true })
  reScheduleDelayInMinutes?: number; // Optional

  @Column({ default: 0 })
  rescheduleCount: number;

  constructor(
    notificationPayload: string,
    scheduledDate: Date,
    status: NotificationStatus = NotificationStatus.PENDING,
    reScheduleDelayInMinutes: number = 0, // Default value
    rescheduleCount: number = 0, // Default to 0
  ) {
    this.notificationPayload = notificationPayload;
    this.scheduledDate = scheduledDate;
    this.status = status;
    this.reScheduleDelayInMinutes = reScheduleDelayInMinutes;
    this.rescheduleCount = rescheduleCount;
  }
}