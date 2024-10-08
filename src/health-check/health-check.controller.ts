import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {
  constructor() {}

  @Get()
  healthCheck() {
    return 'Client gateway is up and running !!';
  }
}
