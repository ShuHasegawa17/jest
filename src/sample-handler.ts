import RandomService from './RandomService';
import { random, randomFunc } from './random';

export function calculate(): number {
  return random.randomModle();
}

export function calculate2(): number {
  return randomFunc();
}

export function calculate3(): number {
  return new RandomService().random();
}
