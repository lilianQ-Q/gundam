import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSiteDTO 
{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    interval: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsNotEmpty()
    groupIds: number[]
}