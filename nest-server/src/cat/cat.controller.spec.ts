import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { ForbiddenException } from 'src/exception/forbidden';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cat')
export class CatController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats' + (request?.query?.name || '');
  }

  @Get('condition')
  findCondition(@Req() request: Request): string {
    return (
      'This action returns cats with condition' + (request?.query?.name || '')
    );
  }

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('ab*cd')
  findWildcard(): string {
    return 'This route uses a wildcard';
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect(): void {
    return;
  }

  @Get('redirect-change')
  @Redirect('https://docs.nestjs.com', 301)
  redirectChange(@Query('version') version: string) {
    return {
      url: `https://docs.nestjs.com/v${version}`,
      statusCode: 302,
    };
  }

  // @Get(':name')
  // findOne(@Req() request: Request): string {
  //   return (
  //     'This action returns a cat / route parameters{' +
  //     request.params.name +
  //     '}'
  //   );
  // }

  // @Get(':name')
  // findOne(@Param() params): string {
  //   return 'This action returns a cat / route parameters{' + params?.name + '}';
  // }

  @Get(':name')
  findOne(@Param('name') name: string): string {
    return 'This action returns a cat / route parameters{' + name + '}';
  }

  @Get('async')
  async findAsync(): Promise<string> {
    return 'This action returns cats';
  }

  @Post('create-cat')
  async createCat(@Body() createCatDto: CreateCatDto) {
    return `This action adds a new cat / ${createCatDto.name} / ${createCatDto.age} / ${createCatDto.breed}`;
  }
}

@Controller('provider-cat')
@UseFilters(new HttpExceptionFilter())
export class ProviderCatsController {
  constructor(private catService: CatsService) {}

  @Post()
  // 단일 create 경로에만 예외 적용 시
  // @UseFilters(new HttpExceptionFilter())
  // @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
    throw new ForbiddenException();
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.fintAll();
  }

  @Get('exception')
  async findAllException(): Promise<Cat[]> {
    throw new ForbiddenException();
  }
}
