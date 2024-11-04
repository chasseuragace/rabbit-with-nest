"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const notification_schedule_service_1 = require("./notification-schedule.service");
const notification_schedule_entity_1 = require("./entities/notification-schedule.entity");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@nestjs/common");
let NotificationCronService = class NotificationCronService {
    constructor(scheduleService, notificationClient) {
        this.scheduleService = scheduleService;
        this.notificationClient = notificationClient;
    }
    onModuleInit() {
        // Immediately run the handleCron method when the module is initialized
        this.handleCron();
    }
    async handleCron() {
        console.log("Running cron job...");
        const notifications = await this.scheduleService.findDueNotifications();
        for (const notification of notifications) {
            try {
                // Send notification via RabbitMQ
                await this.notificationClient.emit('send_notification', {
                    id: notification.id,
                    payload: notification.notificationPayload,
                });
                // Update the notification status to TRIGGERED
                notification.status = notification_schedule_entity_1.NotificationStatus.TRIGGERED;
                await this.scheduleService.updateNotification(notification);
                // Optionally wait for confirmation of success, then update status
                // For this example, we assume sending is always successful
                notification.status = notification_schedule_entity_1.NotificationStatus.SUCCESS;
                await this.scheduleService.updateNotification(notification);
            }
            catch (error) {
                console.error(`Failed to send notification ${notification.id}:`, error);
                // Update the status to indicate failure
                notification.status = notification_schedule_entity_1.NotificationStatus.PENDING; // Optionally reschedule or keep it pending
                await this.scheduleService.updateNotification(notification);
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('*/1 * * * *') // Run every minute
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationCronService.prototype, "handleCron", null);
NotificationCronService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_2.Inject)('NOTIFICATION_SERVICE')),
    __metadata("design:paramtypes", [notification_schedule_service_1.NotificationScheduleService,
        microservices_1.ClientProxy])
], NotificationCronService);
exports.NotificationCronService = NotificationCronService;
//# sourceMappingURL=notification-cron.service.js.map