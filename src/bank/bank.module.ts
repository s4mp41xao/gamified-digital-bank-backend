import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { Account, AccountSchema } from '../schemas/account.schema';
import { Transaction, TransactionSchema } from '../schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [BankService],
  controllers: [BankController],
  exports: [BankService],
})
export class BankModule { }
