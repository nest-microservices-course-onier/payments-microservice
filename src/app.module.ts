import { Module } from '@nestjs/common';

import { HealthCheckModule } from './health-check/health-check.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    PaymentModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
