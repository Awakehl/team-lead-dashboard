import {TaskDTO} from "../dto/task-dto";
import {TaskRepository} from "../repository/task-repository";

import Moment = moment.Moment;
import {TaskReportFilterDTO} from "../dto/task-report-filter-dto";

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

    getUnassignedTasks(epics: string[]): Promise<TaskDTO[]> {
        return this.repository.getUnassignedTasks(epics);
    }

    getByDate(from: Moment): Promise<TaskDTO[]> {
        return this.repository.getByDate(from);
    }

    getByFilter(filter: TaskReportFilterDTO): Promise<TaskDTO[]> {
        return this.repository.getByFilter(filter);
    }

}