import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';
import { Transaction, TransactionDocument, TransactionType } from '../schemas/transaction.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BankService {
    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        private eventEmitter: EventEmitter2,
    ) { }

    async createAccount(userId: string) {
        const account = new this.accountModel({ userId: new Types.ObjectId(userId) });
        return account.save();
    }

    async getBalance(userId: string) {
        const account = await this.accountModel.findOne({ userId: new Types.ObjectId(userId) });
        if (!account) {
            // Auto create for simulation simplicity if not exists
            return this.createAccount(userId);
        }
        return account;
    }

    async deposit(userId: string, amount: number) {
        if (amount <= 0) throw new BadRequestException('Amount must be positive');
        const account = await this.getBalance(userId);
        account.balance += amount;
        await account.save();

        const transaction = new this.transactionModel({
            toAccountId: account._id,
            amount,
            type: TransactionType.DEPOSIT,
        });
        await transaction.save();

        this.eventEmitter.emit('bank.deposit', { userId, amount });
        return account;
    }

    async withdraw(userId: string, amount: number) {
        if (amount <= 0) throw new BadRequestException('Amount must be positive');
        const account = await this.getBalance(userId);
        if (account.balance < amount) throw new BadRequestException('Insufficient funds');

        account.balance -= amount;
        await account.save();

        const transaction = new this.transactionModel({
            fromAccountId: account._id,
            amount,
            type: TransactionType.WITHDRAW,
        });
        await transaction.save();

        return account;
    }

    async transfer(fromUserId: string, toUserId: string, amount: number) {
        if (amount <= 0) throw new BadRequestException('Amount must be positive');
        if (fromUserId === toUserId) throw new BadRequestException('Cannot transfer to self');

        const fromAccount = await this.getBalance(fromUserId);
        const toAccount = await this.getBalance(toUserId);

        if (fromAccount.balance < amount) throw new BadRequestException('Insufficient funds');

        fromAccount.balance -= amount;
        toAccount.balance += amount;

        await fromAccount.save();
        await toAccount.save();

        const transaction = new this.transactionModel({
            fromAccountId: fromAccount._id,
            toAccountId: toAccount._id,
            amount,
            type: TransactionType.TRANSFER,
        });
        await transaction.save();

        this.eventEmitter.emit('bank.transfer', { fromUserId, toUserId, amount });
        return transaction;
    }

    async getStatement(userId: string) {
        const account = await this.getBalance(userId);
        return this.transactionModel.find({
            $or: [{ fromAccountId: account._id }, { toAccountId: account._id }],
        }).sort({ timestamp: -1 }).exec();
    }
}
