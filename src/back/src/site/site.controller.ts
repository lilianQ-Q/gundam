import { Controller, Post } from '@nestjs/common';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {

    public constructor(private siteService: SiteService) {}

    @Post('create')
    createSite()
    {
        
    }
}
