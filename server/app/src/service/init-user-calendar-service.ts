import {UserService} from "./user-service";
import {UserCalendarService} from "./user-calendar-service";
import {UserDTO} from "../dto/user-dto";

export class InitUserCalendarService {

    private userService: UserService;
    private userCalendarService: UserCalendarService;

    constructor(userService: UserService, userCalendarService: UserCalendarService) {
        this.userService = userService;
        this.userCalendarService = userCalendarService;
    }

    initUsers(): void {

        this.userService.getAll().then((users: UserDTO[]): void => {
            let user: UserDTO;

            for (user of users) {
                this.userCalendarService.initUserCalendar(user.id);
            }
        })
    }

}