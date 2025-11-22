import { Controller, Get, Post, Body, Req, UseGuards, Param } from '@nestjs/common';
import { BankService } from './bank.service';
import { Request } from 'express';

@Controller('bank')
export class BankController {
    constructor(private readonly bankService: BankService) { }

    // TODO: Add AuthGuard
    @Get('balance/:userId')
    async getBalance(@Param('userId') userId: string) {
        return this.bankService.getBalance(userId);
    }

    @Post('deposit')
    async deposit(@Body() body: { userId: string; amount: number }) {
        return this.bankService.deposit(body.userId, body.amount);
    }

    @Post('withdraw')
    async withdraw(@Body() body: { userId: string; amount: number }) {
        return this.bankService.withdraw(body.userId, body.amount);
    }

    @Post('transfer')
    async transfer(@Body() body: { fromUserId: string; toUserId: string; amount: number }) {
        return this.bankService.transfer(body.fromUserId, body.toUserId, body.amount);
    }

    @Get('statement/:userId')
    async getStatement(@Param('userId') userId: string) {
        return this.bankService.getStatement(userId);
    }
}
