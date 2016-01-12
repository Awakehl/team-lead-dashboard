import {TaskDTO} from "../dto/task-dto";
import {TaskRepository} from "../repository/task-repository";

export class TaskService {

    r: TaskRepository;

    self = this;

    public constructor(repository: TaskRepository) {
        this.self.r = repository;
    }

    importTasks(tasks: TaskDTO[]):Promise<TaskDTO[]> {
        return this.self.r.updateOrInsertTasks(tasks);
    }

}