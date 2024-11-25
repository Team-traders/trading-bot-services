import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { BackofficeCoursesResponse } from '../../../Contexts/example/Courses/application/BackofficeCoursesResponse';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { SearchAllCoursesQuery } from '../../../Contexts/example/Courses/application/SearchAll/SearchAllCoursesQuery';

export class CoursesGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run(_req: Request, res: Response) {
    const query = new SearchAllCoursesQuery();
    const response = await this.queryBus.ask<BackofficeCoursesResponse>(query);

    res.status(httpStatus.OK).send(response.courses);
  }
}
