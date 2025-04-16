import { Module } from '@nestjs/common';
import { AbsController } from './abs.controller';
import { AbsVideoDistributionService } from './abs-distribution.service';

@Module({
  controllers: [AbsController],
  providers: [AbsVideoDistributionService],
})
export class AbsModule {}
