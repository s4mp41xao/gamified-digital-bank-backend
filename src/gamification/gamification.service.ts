import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GamificationProfile, GamificationProfileDocument } from '../schemas/gamification.schema';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class GamificationService {
    constructor(
        @InjectModel(GamificationProfile.name) private gamificationModel: Model<GamificationProfileDocument>,
    ) { }

    async getProfile(userId: string) {
        const profile = await this.gamificationModel.findOne({ userId: new Types.ObjectId(userId) });
        if (!profile) {
            return new this.gamificationModel({ userId: new Types.ObjectId(userId) }).save();
        }
        return profile;
    }

    @OnEvent('bank.deposit')
    async handleDeposit(payload: { userId: string; amount: number }) {
        const profile = await this.getProfile(payload.userId);
        // XP logic: 1 XP per 10 units deposited
        const xpEarned = Math.floor(payload.amount / 10);
        if (xpEarned > 0) {
            await this.addXp(profile, xpEarned);
            await this.checkAchievements(profile, 'DEPOSIT', payload.amount);
        }
    }

    @OnEvent('bank.transfer')
    async handleTransfer(payload: { fromUserId: string; toUserId: string; amount: number }) {
        const profile = await this.getProfile(payload.fromUserId);
        // XP logic: 5 XP per transfer
        await this.addXp(profile, 5);
        await this.checkAchievements(profile, 'TRANSFER', payload.amount);
    }

    private async addXp(profile: GamificationProfileDocument, amount: number) {
        profile.xp += amount;
        // Level up logic: Level = 1 + floor(sqrt(XP / 100))
        const newLevel = 1 + Math.floor(Math.sqrt(profile.xp / 100));
        if (newLevel > profile.level) {
            profile.level = newLevel;
            // Could emit 'gamification.levelup' event here
        }
        await profile.save();
    }

    private async checkAchievements(profile: GamificationProfileDocument, type: string, value: number) {
        // Simple achievement logic
        if (type === 'DEPOSIT' && value >= 1000 && !profile.achievements.includes('HIGH_ROLLER')) {
            profile.achievements.push('HIGH_ROLLER');
            await profile.save();
        }
        if (type === 'TRANSFER' && !profile.achievements.includes('FIRST_TRANSFER')) {
            profile.achievements.push('FIRST_TRANSFER');
            await profile.save();
        }
    }
}
