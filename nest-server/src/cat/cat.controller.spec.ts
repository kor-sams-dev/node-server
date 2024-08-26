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
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cat.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

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
export class ProviderCatController {
  constructor(private catService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.fintAll();
  }
}
