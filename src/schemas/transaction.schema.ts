import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

export enum TransactionType {
    TRANSFER = 'TRANSFER',
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
}

@Schema()
export class Transaction {
    @Prop({ type: Types.ObjectId, ref: 'Account' })
    fromAccountId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Account' })
    toAccountId: Types.ObjectId;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true, enum: TransactionType })
    type: TransactionType;

    @Prop({ default: Date.now })
    timestamp: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
