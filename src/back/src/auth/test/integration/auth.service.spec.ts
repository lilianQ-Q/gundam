import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../app.module";
import { AuthService } from "../../auth.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { Tokens } from "../../types";
import { User } from "@prisma/client";

const user = {
    email: 'test@gmail.com',
    password: 'ptitmotdepassetavu',
    displayName: 'testo'
}

describe('Auth Flow', () => {
    let prisma: PrismaService;
    let authService: AuthService;
    let moduleRef: TestingModule;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        prisma = moduleRef.get(PrismaService);
        authService = moduleRef.get(AuthService);
        await prisma.clearDatabase();
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe('Signup', () => {

        afterAll(async () => {
            await prisma.clearDatabase();
        });

        it('Should signup', async () => {
            const tokens = await authService.signupLocal({
                email: 'pokemon@gmail.com',
                displayname: 'pokemonstreet',
                password: 'toorroot'
            });

            expect(tokens.access_token).toBeTruthy();
            expect(tokens.refresh_token).toBeTruthy();
        });

        it('Should create a duplicate user error', async () => {
            let tokens: Tokens | undefined;
            try {
                tokens = await authService.signupLocal({
                    email: 'pokemon@gmail.com',
                    displayname: 'pokemonstreet',
                    password: 'toorroot'
                });
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });

    });

    describe("Signin", () => {

        it("Should throw if no existing user", async() => {
            let tokens: Tokens | null;
            try {
                tokens = await authService.signinLocal({
                    email: user.email,
                    password: user.password
                });
            } catch (error) {
                expect(error.status).toBe(403);
            }
            expect(tokens).toBeUndefined();
        });

        it("Should login", async () => {
            await authService.signupLocal({
                email: user.email,
                displayname: user.displayName,
                password: user.password
            });

            const tokens = await authService.signinLocal({
                email: user.email,
                password: user.password
            });

            expect(tokens.access_token).toBeTruthy();
            expect(tokens.refresh_token).toBeTruthy();
        });

        it("Should throw if password incorrect", async () => {
            let tokens : Tokens | undefined;
            try {
                tokens = await authService.signinLocal({
                    email: user.email,
                    password: 'incorrect'
                });
            } catch (error) {
                expect(error.status).toBe(403);
            }
            expect(tokens).toBeUndefined();
        });
    });

    describe("Logout", () => {

        beforeAll(async () => {
            prisma.clearDatabase();
        });
        
        it("Should pass if call to non existent user", async () => {
            const result = await authService.logout(4);
            expect(result).toBeTruthy();
        });

        it("Should logout", async () => {
            await authService.signupLocal({
                email: user.email,
                displayname: user.displayName,
                password: user.password
            });

            let userFromDb : User | null;

            userFromDb = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            });
            expect(userFromDb?.hashedRt).toBeTruthy();

            await authService.logout(userFromDb!.id);

            userFromDb = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            });

            expect(userFromDb?.hashedRt).toBeFalsy();
        });

    });

    describe("Refresh", () => {

        beforeAll(async () => {
            await prisma.clearDatabase();
        });

        it("Should throw if user does not exists", async () => {
            let tokens: Tokens | undefined;
            try {
                tokens = await authService.refreshTokens(1, '');
            } catch (error) {
                expect(error.status).toBe(403);
            }
            expect(tokens).toBeUndefined();
        });

        it("Should throw if user logged out", async () => {
            const _tokens = await authService.signupLocal({
                email: user.email,
                displayname: user.displayName,
                password: user.password
            });

            const rt = _tokens.refresh_token;

            const userFromDb = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            });
            const userId = Number(userFromDb.id);

            await authService.logout(userId);

            let tokens: Tokens | undefined;
            try {
                tokens = await authService.refreshTokens(userId, rt);
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });

        it("Should throw if refresh token is incorrect", async () => {
            await prisma.clearDatabase();

            const _tokens = await authService.signupLocal({
                email: user.email,
                displayname: user.displayName,
                password: user.password
            });

            const test = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            });

            let tokens: Tokens | undefined;
            try {
                tokens = await authService.refreshTokens(test.id, "ezez");
            } catch (error) {
                expect(error.status).toBe(403);
            }
            expect(tokens).toBeUndefined();
        });

        it("Should refresh user's tokens", async () => {
            await prisma.clearDatabase();

            const _tokens = await authService.signupLocal({
                email: user.email,
                displayname: user.displayName,
                password: user.password
            });

            const rt = _tokens.refresh_token;
            const at = _tokens.access_token;

            const userFromDb = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            });

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            });

            const tokens = await authService.refreshTokens(userFromDb.id, rt);
            expect(tokens).toBeDefined();

            expect(tokens.access_token).not.toBe(at);
            expect(tokens.refresh_token).not.toBe(rt);
        });
    });

    describe("User's data", () => { 
        beforeAll(async () => {
            await prisma.clearDatabase();
        });

        it('Should return user data', async () => {
            await authService.signupLocal({
                displayname: user.displayName,
                email: user.email,
                password: user.password
            });

            const userFromDb = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            });

            const userInfo = await authService.getUserInfo(userFromDb.id);

            expect(userInfo.email).toBe(user.email);
            expect(userInfo.displayName).toBe(user.displayName);
        });
    })
});