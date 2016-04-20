import {TaskDTO} from "../dto/task-dto";
import {UserDTO} from "../dto/user-dto";
import {UserRepository} from "../repository/user-repository";
import Promise = require('bluebird');
import {UserCalendarService} from "./user-calendar-service";

export class UserService {

    private repository: UserRepository;
    private userCalendarService: UserCalendarService;

    public constructor(repository: UserRepository, userCalendarService: UserCalendarService) {
        this.repository = repository;
        this.userCalendarService = userCalendarService;
    }

    public importUsersFromTasks(tasks: TaskDTO[]): Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve: Function) => {

            let existing:any = {};
            let user: UserDTO;
            let insert: UserDTO[] = [];
            let task: TaskDTO;

            this.repository.getAll().then(
                (users: UserDTO[]): void => {

                    for (user of users) {
                        existing[user.name] = user;
                    }

                    for (task of tasks) {
                        if (task.assignee && !existing.hasOwnProperty(task.assignee)) {
                            let dto: UserDTO = new UserDTO(null, task.assignee);
                            insert.push(dto);
                            existing[task.assignee] = dto;
                        }
                    }

                    if (insert.length) {
                        this.repository.createMany(insert).then((): void => {
                            for (user of insert) {
                                this.userCalendarService.initUserCalendar(user.id);
                            }
                            resolve(tasks);
                        })
                    } else {
                        resolve(tasks);
                    }
                }
            );
        });
    }

    getByIds(userIds: number[]): Promise<UserDTO[]> {
        return this.repository.getByIds(userIds);
    }

    getAll(): Promise<UserDTO[]> {
        return this.repository.getAll();
    }
}