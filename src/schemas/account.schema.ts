import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ required: true, default: 0 })
    balance: number;

    @Prop({ required: true, default: 'BRL' })
    currency: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
