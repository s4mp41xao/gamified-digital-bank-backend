import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string; // Managed by auth system, but storing here for simplicity if needed or linked

    @Prop({ default: ['user'] })
    roles: string[];

    @Prop({ type: Object, default: { inventory: [], stats: {} } })
    profile: {
        inventory: any[];
        stats: any;
    };
}

export const UserSchema = SchemaFactory.createForClass(User);
