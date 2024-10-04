import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Request, Response } from 'express';

import { PaymentService } from './payment.service';

import { PaymentSessionDto } from './dto/payment-session.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-session') // for REST traditional server
  @MessagePattern('create.payment.session') // for connect between microservices via NATS on this network
  createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDto) {
    return this.paymentService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  @Get('cancel')
  cancel() {
    return {
      ok: true,
      message: 'Payment cancelled',
    };
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentService.stripeWebhook(req, res);
  }

}
