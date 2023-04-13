import RandomService from '../src/RandomService';
import { random, randomFunc } from '../src/random';
import { calculate, calculate2, calculate3 } from '../src/sample-handler';
import { v4 as uuidv4 } from '../__mocks__/uuid';
import fooBar from '../src/fooBar';
// 自動モック
jest.mock('../src/random');
jest.mock('../src/RandomService');

test('戻り値の指定', () => {
  const syncFunc1 = jest.fn().mockImplementation(() => 1);
  const syncFunc2 = jest.fn().mockReturnValue(1);

  expect(1).toBe(syncFunc1());
  expect(1).toBe(syncFunc2());
});

test('戻り値の指定(Promise)', async () => {
  const asyncFunc1 = jest.fn().mockResolvedValue(1);
  const asyncFunc2 = jest.fn().mockRejectedValue(new Error('async error'));
  expect(1).toBe(await asyncFunc1());
  try {
    await asyncFunc2();
  } catch (e) {
    expect(e).toEqual(new Error('async error'));
  }
  expect(asyncFunc2).toHaveBeenCalled();
});

test('objectとしてexportしたモジュールのモック化', () => {
  const mockModule = random as jest.Mocked<typeof random>;
  mockModule.randomModle.mockReturnValue(100);

  const ret = calculate(); // 100
  expect(100).toBe(ret);
  expect(mockModule.randomModle).toHaveBeenCalledTimes(1);
});

test('関数としてexportしたモジュールのモック化', () => {
  const mockFunc = randomFunc as jest.MockedFunction<typeof randomFunc>;
  mockFunc.mockReturnValue(200);
  const ret = calculate2(); // 200
  expect(200).toBe(ret);
  expect(randomFunc).toHaveBeenCalledTimes(1);
});

test('Classとしてexportしたモジュールをモック化 - メソッド', () => {
  const mockMethod = RandomService.prototype.random as jest.MockedFunction<
    typeof RandomService.prototype.random
  >;
  mockMethod.mockImplementation(() => 300);
  const ret = calculate3(); // 300
  expect(300).toBe(ret);
  expect(mockMethod).toHaveBeenCalledTimes(1);
});

test('マニュアルモック', () => {
  // 行頭のjest.mock(...) は不要
  expect(uuidv4()).toBe('00000000-0000-0000-0000-000000000000');
});

test('部分モック', () => {
  const spy = jest.spyOn(fooBar, 'foo').mockReturnValue('mock');
  expect(fooBar.foo()).toBe('mock'); // mockの値で表示
  expect(fooBar.bar()).toBe('bar'); // 実態の値で表示
  expect(spy).toHaveBeenCalledTimes(1);
});
