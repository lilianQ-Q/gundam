import { Injectable } from '@nestjs/common';
import { Group } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDTO } from './dto';

@Injectable()
export class GroupService {

    constructor(private prisma: PrismaService) {}

    async createGroup(dto: CreateGroupDTO) : Promise<Group | null>
    {
        return await this.prisma.group.create({
            data: {
                name: dto.name
            }
        });
    }

    async getAll() : Promise<Group[] | null>
    {
        return await this.prisma.group.findMany(
            {
                include: {
                    sites: true
                }
            }
        );
    }
}
