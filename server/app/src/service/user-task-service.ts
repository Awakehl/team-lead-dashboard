import {TaskDTO} from "../dto/task-dto";
import {UserTaskRepository} from "../repository/user-task-repository";
export class UserTaskService {

    private repository: UserTaskRepository;

    public constructor(repository: UserTaskRepository) {
        this.repository = repository;
    }

    update(tasks: TaskDTO[]): Promise<TaskDTO[]> {

        return this.repository.update(tasks);
    }
}