import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

import { envs } from './config';

async function bootstrap() {

  const logger = new Logger('Payment-MS');

  // This make this MS a Rest(traditional)
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Question: Why this microservice use NestFactory.create and also app.connectMicroservice
  // Response: because this microservice is not equal to anothers. This MS is hibrid between Nats and Rest(traditional), both working in this MS.

  // This make this MS connect with NATS
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers, // with NATS_SERVERS in the env file 
      },
    },
    { inheritAppConfig: true } // important to allow global pipes and global config passed in hibrid servers
  );

  await app.startAllMicroservices(); // this allow to connect with NATS server
  await app.listen(envs.port);

  logger.log(`Payments Microservice running on port ${envs.port}`);
}
bootstrap();
