import { Injectable, OnModuleInit } from '@nestjs/common';
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

        const { betterAuth } = await import('better-auth');
        const { mongodbAdapter } = await import('better-auth/adapters/mongodb');

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
