import {Controller, Post, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {WebhookService} from "./webhook.service";

@Controller({path: 'payments/webhook'})
export class WebhookController{
    constructor(
        private webhookService: WebhookService
    ) {}
    @Post("stripe")
    public async handleStripeWebhook(@Req() req: Request, @Res() res: Response): Promise<void> {
        await this.webhookService.handleWebhook(req)
        res.status(200).send()
    }
}