import { Injectable, OnModuleInit } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Injectable()
export class AuthService implements OnModuleInit {
    private auth: any;

    constructor(private configService: ConfigService) { }

    async onModuleInit() {
        const client = new MongoClient(this.configService.get<string>('MONGO_URI') || '');
        await client.connect();
        const db = client.db();

        this.auth = betterAuth({
            database: mongodbAdapter(db),
            emailAndPassword: {
                enabled: true,
            },
            secret: this.configService.get<string>('BETTER_AUTH_SECRET'),
        });
    }

    getAuth() {
        return this.auth;
    }
}
