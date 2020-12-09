import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  tasks = [];

  getAllTasks() {
    return this.tasks;
  }
}
