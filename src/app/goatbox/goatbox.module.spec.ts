import {GoatboxModule} from './goatbox.module';

describe('GoatboxModule', () => {
  let goatboxModule: GoatboxModule;

  beforeEach(() => {
    goatboxModule = new GoatboxModule();
  });

  it('should create an instance', () => {
    expect(goatboxModule).toBeTruthy();
  });
});
