import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiExcludeEndpoint} from "@nestjs/swagger";

@Controller()
export class AppController {

  @ApiExcludeEndpoint()
  @Get()
  CONNECT_ROOT_API_GET_TEST() {
    return '[ROOT API] GET: succeed';
  }

  @ApiExcludeEndpoint()
  @Post()
  CONNECT_ROOT_API_POST_TEST() {
    return '[ROOT API] POST: succeed';
  }
}
