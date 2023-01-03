const sum = (x: number, y: number) => x + y;

describe('Initial test', () => {
  test('test sum function', () => {
    expect(expect(2 + 2)).toEqual(4);
  });
});
