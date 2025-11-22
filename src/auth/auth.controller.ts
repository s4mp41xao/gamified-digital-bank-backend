import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() body: any, @Req() req: Request, @Res() res: Response) {
        const auth = this.authService.getAuth();
        // Using better-auth's internal API to handle request if possible, or just calling signUp
        // Since better-auth is usually for frameworks, we might need to use its handler
        // For now, let's assume we can call api.signUpEmail
        try {
            const response = await auth.api.signUpEmail({
                body,
                headers: req.headers,
            });
            return res.json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    @Post('signin')
    async signIn(@Body() body: any, @Req() req: Request, @Res() res: Response) {
        const auth = this.authService.getAuth();
        try {
            const response = await auth.api.signInEmail({
                body,
                headers: req.headers,
            });
            return res.json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
