import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'sortTasks'
})
export class SortTasksPipe implements PipeTransform {

  transform(list: Task[], sort: number): Task[] {
    if (sort == 1)
      list.sort((a, b) => a.content.localeCompare(b.content, 'pl', { caseFirst: 'upper' }))
    if (sort == 2)
      list.sort((a, b) => -1 * a.content.localeCompare(b.content, 'pl', { caseFirst: 'lower' }))
    if (sort == 3)
      list = list.sort(({ priority: a }, { priority: b }) => b - a)
    if (sort == 4)
      list = list.sort(({ priority: a }, { priority: b }) => a - b)
    return list;
  }

}
