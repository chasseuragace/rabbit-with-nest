import { Injectable } from '@nestjs/common';
import { OrderDto } from './order.dto';




//also here the order is not string
@Injectable()
export class AppService {
  orders: OrderDto[] = [];
  handleSendNotification(notification: OrderDto) {
    console.log('Consumer Received Notification:', JSON.stringify(notification, null, 2));
    this.orders.push(notification);
    // TODO: Implement email sending logic here
  }
  

  getOrders() {
    return this.orders;
  }
}
