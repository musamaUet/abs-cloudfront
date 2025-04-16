import { Controller, Get, Param, Res } from '@nestjs/common';
import { AbsContentPathParams } from './abs.model';
import { AbsVideoDistributionService } from './abs-distribution.service';
import { Response } from 'express';

@Controller('abs')
export class AbsController {
  constructor(
    private readonly absDistributionService: AbsVideoDistributionService,
  ) {}

  @Get(':s3Key/access')
  async getFileAccess(
    @Param() params: AbsContentPathParams,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { s3Key } = params;

    const result = await this.absDistributionService.getSignedCookiesForFile(
      s3Key,
    );

    console.log('result', result);

    // set cookies on response
    Object.keys(result.cookies).forEach((key) => {
      const curr = result.cookies[key];
      response.cookie(key, curr.value, curr.options);
    });

    return result;
  }
}
