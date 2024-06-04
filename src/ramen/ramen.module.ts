import { Module } from '@nestjs/common';
import { RamenController } from './ramen.controller';
import { RamenService } from './ramen.service';

@Module({
  controllers: [RamenController],
  providers: [RamenService]
})
export class RamenModule {}
