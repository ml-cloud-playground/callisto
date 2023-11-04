import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IScore } from './interfaces/IScore';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('score/:input')
  async score(@Param('input') input): Promise<IScore> {
    return await this.appService.getScore(input);
  }
}
