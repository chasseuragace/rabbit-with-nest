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
exports.NotificationScheduleController = void 0;
const common_1 = require("@nestjs/common");
const notification_schedule_service_1 = require("./notification-schedule.service");
const create_notification_schedule_dto_1 = require("./dto/create-notification-schedule.dto");
let NotificationScheduleController = class NotificationScheduleController {
    constructor(service) {
        this.service = service;
    }
    async scheduleNotification(dto) {
        return this.service.scheduleNotification(dto);
    }
    async listScheduledNotifications() {
        return this.service.listScheduledNotifications();
    }
    async deleteScheduledNotification(id) {
        return this.service.deleteScheduledNotification(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_schedule_dto_1.CreateNotificationScheduleDto]),
    __metadata("design:returntype", Promise)
], NotificationScheduleController.prototype, "scheduleNotification", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationScheduleController.prototype, "listScheduledNotifications", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationScheduleController.prototype, "deleteScheduledNotification", null);
NotificationScheduleController = __decorate([
    (0, common_1.Controller)('notification-schedule'),
    __metadata("design:paramtypes", [notification_schedule_service_1.NotificationScheduleService])
], NotificationScheduleController);
exports.NotificationScheduleController = NotificationScheduleController;
//# sourceMappingURL=notification-schedule.controller.js.map