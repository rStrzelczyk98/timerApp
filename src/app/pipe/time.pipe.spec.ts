import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  let pipe: TimePipe;
  beforeEach(() => {
    pipe = new TimePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return string: "00:00:00"', () => {
    const result = pipe.transform(0);
    expect(result).toEqual('00:00:00');
  });
  it('should return string: "12:34:56"', () => {
    const result = pipe.transform(45296000);
    expect(result).toEqual('12:34:56');
  });
});
