import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task';

@Pipe({
  name: 'filterPriority',
  pure: false
})
export class FilterPriorityPipe implements PipeTransform {

  transform(list: Task[], filterPrio: number, isSet: boolean, filterDone: boolean): Task[] {

    if (isSet)
      list = list.filter((elem: Task) => elem.priority == filterPrio);
    if (filterDone)
      list = list.filter((elem: Task) => elem.isDone == false)
    return list;
  }

}
