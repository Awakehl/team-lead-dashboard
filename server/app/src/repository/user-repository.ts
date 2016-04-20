/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>

import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-converter-service";
import {UserDTO} from "../dto/user-dto";
import Promise = require('bluebird');

declare var app: AppService;

export class UserRepository {

    public createMany(dtos:UserDTO[]): Promise<string[]> {
        return this.getEntity().bulkCreate(dtos);
    };

    public getAll(): Promise<UserDTO[]> {

        return new Promise<UserDTO[]>((resolve: Function): void => {

            this.getEntity().findAll().then(
                (dbUsers: string[]): void => {

                    let result: UserDTO[] = [];

                    for (let dbUser of dbUsers) {
                        result.push(app.getEntityConverterService().toUserDTO(dbUser));
                    }

                    resolve(result);
                }

            )
        })
    }

    public getByIds(userIds: number[]): Promise<UserDTO[]> {

        return new Promise<UserDTO[]>((resolve: Function): void => {

            this.getEntity().findAll({where:{
                id: {$in: userIds}
            }}).then(
                (dbUsers: string[]): void => {

                    let result: UserDTO[] = [];

                    for (let dbUser of dbUsers) {
                        result.push(app.getEntityConverterService().toUserDTO(dbUser));
                    }

                    resolve(result);
                }

            )
        })
    }

    private getEntity(): Model<string, any> {
        return app.getEntity('User');
    }

}