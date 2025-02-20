/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
//import { ClientsModule, Transport } from '@nestjs/microservices';
//import { envs, ORDER_SERVICE } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
    imports: [
     /*  ClientsModule.register([
        { 
          name: ORDER_SERVICE, 
          transport: Transport.TCP, 
          options: {
           // host: envs.ordersMicroservices,
           // port: envs.ordersMicroservicesPort,
          }
        },
      ]), */
      NatsModule,
    ],
})
export class OrdersModule {}
