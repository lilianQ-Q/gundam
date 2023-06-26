import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}

    hashData(data: string)
    {
        return bcrypt.hash(data, 10);
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            },
            {
                secret: this.configService.get<string>('AT_SECRET'),
                expiresIn: 60 * 1
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            },
            {
                secret: this.configService.get<string>('RT_SECRET'),
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ])
        return {
            access_token: at,
            refresh_token: rt
        };
    }

    async signupLocal(dto: SignUpDto) : Promise<Tokens>
    {
        const hash = await this.hashData(dto.password);

        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                displayName: dto.displayname,
                hash,
            }
        }).catch((error) => {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Invalid credentials');
                }
            }
            throw error;
        });

        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refresh_token);

        return tokens;
    }

    async updateRtHash(userId: number, rt: string) : Promise<void>
    {
        const hash = await this.hashData(rt);
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        });
    }

    async signinLocal(@Body() dto: SignInDto): Promise<Tokens>
    {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (!user) throw new ForbiddenException("Access Denied");

        const passwordMatches = await bcrypt.compare(dto.password, user.hash);
        if (!passwordMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async logout(userId: number) : Promise<boolean>
    {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                }
            },
            data: {
                hashedRt: null
            }
        });
        return true;
    }

    async refreshTokens(userId: number, rt: string) : Promise<Tokens>
    {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user || !user.hashedRt) throw new ForbiddenException("Access Denied");

        const rtMatches = await bcrypt.compare(rt, user.hashedRt);

        if (!rtMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(userId, user.email);
        await this.updateRtHash(userId, tokens.refresh_token);
        return tokens;
    }

    async getUserInfo(userId: number) : Promise<{email: string, displayName: string} | null>
    {
        const user = await this.prisma.user.findUnique({
            select: {
                email: true,
                displayName: true,
            },
            where: {
                id: userId
            }
        });
        if (!user) throw new ForbiddenException("Access Denied: User not found");
        return user;
    }
}
