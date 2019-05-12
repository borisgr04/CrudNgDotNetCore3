import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  task:Task;

  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.task={id:0,title:'', description:'', priority:false}
    console.log('se inicializa el objeto task');
  }
  add(): void {

      this.taskService.add0(this.task)
      .subscribe(task => {
        alert('Se agregó una nueva tarea');
      });


  }


}
