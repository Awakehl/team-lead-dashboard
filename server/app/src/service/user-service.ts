import {TaskDTO} from "../dto/task-dto";
import {UserDTO} from "../dto/user-dto";
import {UserRepository} from "../repository/user-repository";
import Promise = require('bluebird');

export class UserService {

    private repository: UserRepository;

    public constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public importUsersFromTasks(tasks: TaskDTO[]): Promise<void> {

        return new Promise<void>((resolve: Function) => {

            let existing:any = {};
            let user: UserDTO;
            let insert: UserDTO[] = [];
            let task: TaskDTO;

            this.repository.findAll().then(
                (users: UserDTO[]): void => {

                    for (user of users) {
                        existing[user.name] = user;
                    }

                    for (task of tasks) {
                        if (!existing.hasOwnProperty(task.assignee)) {
                            let dto: UserDTO = new UserDTO(null, task.assignee);
                            insert.push(dto);
                            existing[task.assignee] = dto;
                        }
                    }

                    if (insert.length) {
                        this.repository.createMany(insert).then((): void => {
                            resolve();
                        })
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
}