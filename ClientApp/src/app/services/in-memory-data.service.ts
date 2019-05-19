import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const Task = [
      { id: 11, title: 'Mr. Nice', description:'...', priority:true },
      { id: 12, title: 'Narco', description:'...', priority:true },
      { id: 13, title: 'Bombasto', description:'...', priority:false },
      { id: 14, title: 'Celeritas', description:'...', priority:true },
      { id: 15, title: 'Magneta', description:'...', priority:true },
      { id: 16, title: 'RubberMan', description:'...', priority:true },
      { id: 17, title: 'Dynama' , description:'...', priority:true},
      { id: 18, title: 'Dr IQ' , description:'...', priority:true},
      { id: 19, title: 'Magma' , description:'...', priority:true},
      { id: 20, title: 'Tornado' , description:'...', priority:true}
    ];
    return {Task};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  }

}
