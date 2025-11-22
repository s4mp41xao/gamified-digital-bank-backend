import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GamificationProfileDocument = GamificationProfile & Document;

@Schema()
export class GamificationProfile {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    userId: Types.ObjectId;

    @Prop({ default: 0 })
    xp: number;

    @Prop({ default: 1 })
    level: number;

    @Prop({ type: [String], default: [] })
    achievements: string[];
}

export const GamificationProfileSchema = SchemaFactory.createForClass(GamificationProfile);
