import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { StringifyOptions } from "querystring";

export class SignInDto
{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class SignUpDto
{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    displayname: string;
}