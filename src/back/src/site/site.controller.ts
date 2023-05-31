import { Body, Controller, Post } from '@nestjs/common';
import { Site } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import { GetCurrentUserId } from '../auth/common/decorators';
import { CreateSiteDTO } from './dto/create.dto';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {

    public constructor(private siteService: SiteService) {}

    @Post('create')
    @FormDataRequest()
    createSite(@Body() dto: CreateSiteDTO, @GetCurrentUserId() id: number) : Promise<Site | null>
    {
        return this.siteService.createSite(dto, id);
    }
}
