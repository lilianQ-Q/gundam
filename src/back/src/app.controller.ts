import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/common/decorators';

@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  @Public()
  getHello(): string {
    return "cc bande de salope";
  }

  
}
