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
exports.NotificationScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_schedule_entity_1 = require("./entities/notification-schedule.entity");
const typeorm_3 = require("typeorm");
let NotificationScheduleService = class NotificationScheduleService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async scheduleNotification(createDto) {
        const notification = this.notificationRepository.create({
            ...createDto,
            status: notification_schedule_entity_1.NotificationStatus.PENDING,
        });
        return this.notificationRepository.save(notification);
    }
    async listScheduledNotifications() {
        return this.notificationRepository.find();
    }
    async deleteScheduledNotification(id) {
        return this.notificationRepository.delete(id);
    }
    async findDueNotifications() {
        const now = new Date();
        return this.notificationRepository.find({
            where: {
                scheduledDate: (0, typeorm_3.LessThanOrEqual)(now),
                status: notification_schedule_entity_1.NotificationStatus.PENDING, // Only find pending notifications
            },
        });
    }
    // New method to update a notification
    async updateNotification(notification) {
        return this.notificationRepository.save(notification);
    }
};
NotificationScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_schedule_entity_1.NotificationSchedule)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationScheduleService);
exports.NotificationScheduleService = NotificationScheduleService;
//# sourceMappingURL=notification-schedule.service.js.map