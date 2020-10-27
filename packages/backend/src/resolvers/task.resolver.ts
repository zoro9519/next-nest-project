import { Inject } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";

import { TaskDTO } from "../dto/task.dto";
import { TaskModel } from "../models/task.model";
import { TaskService } from "../services/task.service";

@Resolver((of) => TaskModel)
export class TaskResolver {
  constructor(@Inject(TaskService) private taskService: TaskService) {}

  @Query((returns) => TaskModel, { nullable: true })
  async task(@Args("id", { type: () => ID }) id: number) {
    return await this.taskService.findOne(id);
  }

  @Query((returns) => [TaskModel])
  async tasks() {
    return await this.taskService.findAll();
  }

  @Mutation((returns) => TaskModel)
  async saveTask(@Args("task") task: TaskDTO) {
    return await this.taskService.save(task);
  }

  @Mutation((returns) => TaskModel, { nullable: true })
  async deleteTask(@Args("id", { type: () => ID }) id: number) {
    return await this.taskService.delete(id);
  }
}
