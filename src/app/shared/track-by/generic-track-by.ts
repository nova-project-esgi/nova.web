import {Id} from '../ids/id';

export function trackById<T>(index: number, item: Id<T>): T {
  return item.id;
}
