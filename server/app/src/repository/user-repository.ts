/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>

import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-converter-service";
import {UserDTO} from "../dto/user-dto";

declare var app: AppService;

export class UserRepository {

    public findAll(): Promise<UserDTO[]> {
        return new Promise<UserDTO[]>((resolve: Function): void => {
            this.getEntity().findAll().then((dbUsers: string[]): void => {
                let users:UserDTO[] = [];

                for (let dbUser of dbUsers) {
                    users.push(app.getEntityConverterService().toUserDTO(dbUser));
                }

                resolve(users);
            })
        })

    }

    public createMany(dtos:UserDTO[]): Promise<string[]> {
        return this.getEntity().bulkCreate(dtos);
    };

    private getEntity(): Model<string, any> {
        return app.getEntity('User');
    }

}