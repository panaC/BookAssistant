import { Test, TestingModule } from '@nestjs/testing';
import { WebpubService } from './webpub.service';

describe('WebpubService', () => {
  let service: WebpubService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpubService],
    }).compile();
    service = module.get<WebpubService>(WebpubService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
