import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamificationService } from './gamification.service';
import { GamificationController } from './gamification.controller';
import { GamificationProfile, GamificationProfileSchema } from '../schemas/gamification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GamificationProfile.name, schema: GamificationProfileSchema },
    ]),
  ],
  providers: [GamificationService],
  controllers: [GamificationController],
})
export class GamificationModule { }
