import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RamenModule } from './ramen/ramen.module';

@Module({
  imports: [RamenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
