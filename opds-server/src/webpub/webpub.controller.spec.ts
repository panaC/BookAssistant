import { Test, TestingModule } from '@nestjs/testing';
import { WebpubController } from './webpub.controller';

describe('Webpub Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WebpubController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: WebpubController = module.get<WebpubController>(WebpubController);
    expect(controller).toBeDefined();
  });
});
