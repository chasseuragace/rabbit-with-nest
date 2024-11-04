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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchedule = exports.NotificationStatus = void 0;
const typeorm_1 = require("typeorm");
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "pending";
    NotificationStatus["TRIGGERED"] = "triggered";
    NotificationStatus["SUCCESS"] = "success";
})(NotificationStatus = exports.NotificationStatus || (exports.NotificationStatus = {}));
let NotificationSchedule = class NotificationSchedule {
    constructor(notificationPayload, scheduledDate, status = NotificationStatus.PENDING, reScheduleDelayInMinutes = 0, // Default value
    rescheduleCount = 0) {
        this.notificationPayload = notificationPayload;
        this.scheduledDate = scheduledDate;
        this.status = status;
        this.reScheduleDelayInMinutes = reScheduleDelayInMinutes;
        this.rescheduleCount = rescheduleCount;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationSchedule.prototype, "notificationPayload", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], NotificationSchedule.prototype, "scheduledDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.PENDING,
    }),
    __metadata("design:type", String)
], NotificationSchedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationSchedule.prototype, "reScheduleDelayInMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], NotificationSchedule.prototype, "rescheduleCount", void 0);
NotificationSchedule = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Date, String, Number, Number])
], NotificationSchedule);
exports.NotificationSchedule = NotificationSchedule;
//# sourceMappingURL=notification-schedule.entity.js.map