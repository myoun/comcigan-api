import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/timetable")
  async getTimeTable(@Query("code") code: number) {
    const Timetable = require('comcigan-parser')
    const timetable = new Timetable()

    await timetable.init();
    await timetable.setSchool(code);

    let gtt = await timetable.getTimetable()

    return JSON.stringify(gtt)
  }
}
