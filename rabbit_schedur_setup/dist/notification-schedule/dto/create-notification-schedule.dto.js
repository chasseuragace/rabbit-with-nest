"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationScheduleDto = void 0;
class CreateNotificationScheduleDto {
    constructor(notificationPayload, scheduledDate, status = 'pending', reScheduleDelayInMinutes = 0, rescheduleCount = 0) {
        this.notificationPayload = notificationPayload;
        this.scheduledDate = scheduledDate;
        this.status = status;
        this.reScheduleDelayInMinutes = reScheduleDelayInMinutes;
        this.rescheduleCount = rescheduleCount;
    }
}
exports.CreateNotificationScheduleDto = CreateNotificationScheduleDto;
//# sourceMappingURL=create-notification-schedule.dto.js.map