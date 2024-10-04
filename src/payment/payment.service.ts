import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';

import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';

@Injectable()
export class PaymentService {

    private readonly stripe = new Stripe(
        envs.stripeSecretApiKey,
    );

    async createPaymentSession(paymentSessionDto: PaymentSessionDto) {

        const { currency, items, orderId } = paymentSessionDto;

        const lineItems = items.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                // unit_amount: item.price // for example 2000 (is equal to $20 = 2000 / 100)
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await this.stripe.checkout.sessions.create({
            // set here the order id
            payment_intent_data: {
                metadata: {
                    orderId: orderId,
                }
            },
            line_items: lineItems,
            // line_items: [
            //     {
            //         price_data: {
            //             currency: 'usd',
            //             product_data: {
            //                 name: 'T-Shirt',
            //             },
            //             unit_amount: 2000 // is equal to $20 = 2000 / 100
            //         },
            //         quantity: 1,
            //     }
            // ],
            mode: 'payment',
            success_url: envs.stripeSuccessUrl,
            cancel_url: envs.stripeCancelUrl,
        });

        return session;
    }

    async stripeWebhook(req: Request, res: Response ) {
        const signature = req.headers['stripe-signature'];

        let event: Stripe.Event;
        const endpointSecret = envs.stripeEndpointSectret;

        try {
            event = this.stripe.webhooks.constructEvent(
                req['rawBody'],
                signature,
                endpointSecret,
            );
        } catch (error) {
            return res.status(400).send(`Webhook error: ${error.message}`);
        }

        return res.status(200).json({signature});

    }

}
