import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    const sanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']);
    const pipe = new SafeUrlPipe(sanitizerMock);
    expect(pipe).toBeTruthy();
  });
});
