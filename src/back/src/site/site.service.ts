import { Injectable } from '@nestjs/common';
import { Site } from '@prisma/client';
import { group } from 'console';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteDTO } from './dto/create.dto';

@Injectable()
export class SiteService
{
    public constructor(private prisma: PrismaService) {}

    async createSite(dto: CreateSiteDTO, userId: number) : Promise<Site | null>
    {
        return await this.prisma.site.create({
            data: {
                name: dto.name,
                url: dto.url,
                interval: dto.interval,
                description: dto.description,
                userId: userId,
                groups: {
                    connect: dto.groupIds.map((id: number) => ({id: parseInt(id.toString())}))
                }
            }
        })
    }

    async getSiteCount(userId: number) : Promise<number>
    {
        return await this.prisma.site.count({
            where: {
                userId: userId
            }
        });
    }

    async getAllUserSites(userId: number) : Promise<Site[]>
    {
        return await this.prisma.site.findMany({
            where: {
                userId: userId
            },
            include: {
                groups: true
            }
        })
    }
}
