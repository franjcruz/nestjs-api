import { Body, Controller, Delete, Get, HttpStatus, Next, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { CreateEntityDto } from '../dto/create-entity.dto';
import { EntitiesService } from '../services/entities.service';

@Controller('entities')
export class EntitiesController {
  constructor(private entitiesService: EntitiesService) {}

  @Get()
  find(@Res() res: Response, @Next() next: NextFunction, @Query() query) {
    this.entitiesService
      .find(query)
      .then(data => res.json({ data }))
      .catch(err => next(err));
  }

  @Post()
  create(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Body() createEntityDto: CreateEntityDto,
  ) {
    this.entitiesService
      .create(createEntityDto)
      .then(data => res.status(HttpStatus.CREATED).json({ data }))
      .catch(err => next(err));
  }

  @Get(':id')
  findOne(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('id') id: string,
  ) {
    this.entitiesService
      .findOne(id)
      .then(data => res.json({ data }))
      .catch(err => next(err));
  }

  @Patch(':id')
  update(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('id') id: string,
    @Body() updateEntityDto: CreateEntityDto,
  ) {
    this.entitiesService
      .update(id, updateEntityDto)
      .then(data => res.json({ data }))
      .catch(err => next(err));
  }

  @Delete(':id')
  delete(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('id') id: string,
  ) {
    this.entitiesService
      .delete(id)
      .then(() => res.status(HttpStatus.NO_CONTENT).json())
      .catch(err => next(err));
  }
}
