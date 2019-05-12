import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks : Task[];
  constructor(private taskService: TaskService) { }


  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    this.taskService.getAll()
    .subscribe(tasks =>
      {
        this.tasks = tasks
      }
      );
  }



}
