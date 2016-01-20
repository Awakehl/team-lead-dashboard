/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>
/// <reference path="../../../typings/sequelize/sequelize.d.ts"/>

import {Model} from "sequelize";
import Promise = require('bluebird');

export abstract class AbstractRepository {

    protected createMany(dtos:any[]): Promise<string[]> {

        return this.getEntity().bulkCreate(dtos);

    };

    protected updateMany(dtos: any[]): Promise<void> {

        let entity: Model<string, any> = this.getEntity();

        return new Promise<void>(function(resolve: Function): void {

            var dtosConsumable = dtos.concat();

            var consume: Function = function(): void {

                if (dtosConsumable.length) {

                    var dto: any = dtosConsumable.shift();

                    entity.update(
                        dto,
                        {
                            where: {
                                id: dto.id
                            }
                        }
                    ).then(
                        function() {
                            consume();
                        }
                    )
                } else {
                    resolve([]);
                }
            };
            consume();
        });
    }

    protected abstract getEntity(): Model<string, any>;
}