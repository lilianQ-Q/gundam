import { Body, Controller, Get, Post } from '@nestjs/common';
import { Group } from '@prisma/client';
import { GetCurrentUserId } from '../auth/common/decorators';
import { CreateGroupDTO } from './dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController
{
    public constructor(private groupService: GroupService) {}

    @Post('/create')
    createGroup(@Body() dto: CreateGroupDTO, @GetCurrentUserId() userId: number) : Promise<Group | null>
    {
        return this.groupService.createGroup(dto);
    }

    @Get('/getall')
    getAllGroups()
    {
        return this.groupService.getAll();
    }
}
