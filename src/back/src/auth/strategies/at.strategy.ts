import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { REPL_MODE_STRICT } from "repl";
import { AuthService } from "../auth.service";
import { JwtPayload } from "../types";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private prisma: PrismaService, configService: ConfigService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('AT_SECRET'),
            usernameField: 'email',
        });
    }

    async validate(payload: JwtPayload) : Promise<any>
    {
        return payload;
    }
}