import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { AtGuard, RtGuard } from './common/guards';
import { SignInDto, SignUpDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController
{
    constructor(private authService: AuthService) {}

    @Public()
    @Post("local/signup")
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: SignUpDto) : Promise<Tokens>
    {
        return this.authService.signupLocal(dto);
    }

    @Public()
    @Post("local/signin")
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: SignInDto) : Promise<Tokens>
    {
        return this.authService.signinLocal(dto);
    }

    @Get("/userinfo")
    @HttpCode(HttpStatus.OK)
    getUserInfo(@GetCurrentUserId() userId: number) : Promise<{email: string, displayName: string} | null>
    {
        return this.authService.getUserInfo(userId);
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number)
    {
        return this.authService.logout(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string)
    {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
