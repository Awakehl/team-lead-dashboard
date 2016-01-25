import {TaskDTO} from "../dto/task-dto";
import {TaskRepository} from "../repository/task-repository";

export class TaskService {

    private repository: TaskRepository;

    public constructor(repository: TaskRepository) {
        this.repository = repository;
    }

    importTasks(tasks: TaskDTO[]):Promise<TaskDTO[]> {
        return this.repository.updateOrInsertTasks(tasks);
    }

    getByIds(ids: number[] = []): Promise<TaskDTO[]> {
        return this.repository.getByIds(ids);
    }

    getUnassignedTasks(): Promise<TaskDTO[]> {
        return this.repository.getUnassignedTasks();
    }

}