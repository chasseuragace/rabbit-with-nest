"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notification_schedule_service_1 = require("./notification-schedule.service");
const notification_schedule_controller_1 = require("./notification-schedule.controller");
const notification_schedule_entity_1 = require("./entities/notification-schedule.entity");
const notification_cron_service_1 = require("./notification-cron.service");
const microservices_1 = require("@nestjs/microservices");
const schedule_1 = require("@nestjs/schedule");
let NotificationScheduleModule = class NotificationScheduleModule {
};
NotificationScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([notification_schedule_entity_1.NotificationSchedule]),
            microservices_1.ClientsModule.register([
                {
                    name: 'NOTIFICATION_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://rabbitmq:5672'],
                        queue: 'notifications_queue',
                        queueOptions: { durable: true },
                    },
                },
            ]),
        ],
        controllers: [notification_schedule_controller_1.NotificationScheduleController],
        providers: [notification_schedule_service_1.NotificationScheduleService, notification_cron_service_1.NotificationCronService],
    })
], NotificationScheduleModule);
exports.NotificationScheduleModule = NotificationScheduleModule;
//# sourceMappingURL=notification-schedule.module.js.map