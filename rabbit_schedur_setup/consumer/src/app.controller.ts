import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { OrderDto } from './order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @EventPattern('sent_notification')
  handleOrderPlaced(@Payload() order: OrderDto) {
    console.log("consumer event : send_notification");
    return this.appService.handleSendNotification(order);
  }

  @MessagePattern({ cmd: 'sent_wait_notification' })
  getOrders(@Ctx() context: RmqContext, @Payload() order: OrderDto) {
    console.log("consumer cmd : sent_wait_notification");
    return this.appService.getOrders();
  }
  
}
