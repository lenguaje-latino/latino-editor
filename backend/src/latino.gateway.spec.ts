import { Test, TestingModule } from '@nestjs/testing';
import { LatinoGateway } from './latino.gateway';

describe('LatinoGateway', () => {
  let gateway: LatinoGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LatinoGateway],
    }).compile();

    gateway = module.get<LatinoGateway>(LatinoGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
