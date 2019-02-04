import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebpubController } from './webpub/webpub.controller';
import { WebpubService } from './webpub/webpub.service';
import { WebpubModule } from './webpub/webpub.module';

@Module({
  imports: [WebpubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
