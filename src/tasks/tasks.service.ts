import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRespository: TaskRepository,
  ) {}

  /**
   * Get tasks based on the filter dto.
   *
   * @param filterDto GetTasksFilterDto
   */
  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRespository.getTasks(filterDto, user);
  }

  /**
   * Find task for the given id.
   *
   * @param id number the task id
   */
  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRespository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }

    return found;
  }

  /**
   * Create new task with the given data.
   *
   * @param createTaskDto CreateTaskDto
   */
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRespository.createTask(createTaskDto, user);
  }

  /**
   * Delete task based on task id.
   *
   * @param id The task id
   */
  async deleteTask(id: number): Promise<void> {
    const found = await this.taskRespository.delete(id);

    if (found.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
  }

  /**
   * Update the task status based on the task id.
   *
   * @param id The task id
   * @param status The task status
   */
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    task.save();
    return task;
  }
}
