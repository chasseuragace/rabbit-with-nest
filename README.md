Here’s a reduced version of your README file:

---

# RabbitMQ Producer-Consumer in NestJS

This project includes a **Producer** and a **Consumer** that communicate via **RabbitMQ** using **NestJS**, demonstrating both event-driven and RPC (Remote Procedure Call) patterns.

## Overview

- **Producer**: Exposes two APIs to send messages to RabbitMQ—either emitting events or sending messages with a response wait.
- **Consumer**: A microservice that connects to the RabbitMQ server, consuming messages from the `orders-queue` and processing them based on defined patterns.

## Reference Links
- YouTube Tutorial: [Event-Driven Architecture with RabbitMQ](https://www.youtube.com/watch?v=JJrFm8IrYTQ)
- GitHub Repository: [NestJs Microservice RabbitMQ](https://github.com/charbelh3/NestJs-Microservice-RabbitMQ)

## New Project
- **rabbit_schedur_setup**: A new folder containing a project focused on hands-on learning.

## Initial Setup

To run RabbitMQ as a separate service, use the following command:
```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
```

## Scheduler Project

This new project is Dockerized and utilizes PostgreSQL for scheduling notifications. A cron job runs to find due notifications. It serves as a minimal proof of concept for message queue setup and primary logic, currently using **emit**.

### TODO
- Switch to using **send**
- Update notification status
- Add notification consumers

--- 

