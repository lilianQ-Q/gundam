import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController
{
    public constructor (private statusService: StatusService) {}
    
}
