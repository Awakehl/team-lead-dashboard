var Promise = require('bluebird');
var TaskRepository = (function () {
    function TaskRepository() {
    }
    TaskRepository.prototype.updateOrInsertTasks = function (tasks) {
        var _this = this;
        return new Promise(function (resolve) {
            var ids = [];
            var task;
            for (var _i = 0; _i < tasks.length; _i++) {
                task = tasks[_i];
                ids.push(task.id);
            }
            _this.getEntity().findAll({ where: { id: { $in: ids } } }).then(function (dbTasks) {
                var existing = {};
                for (var _i = 0; _i < dbTasks.length; _i++) {
                    var dbTask = dbTasks[_i];
                    task = app.getEntityConverterService().toTaskDTO(dbTask);
                    existing[task.id] = task;
                }
                var update = [];
                var insert = [];
                for (var _a = 0; _a < tasks.length; _a++) {
                    task = tasks[_a];
                    if (existing.hasOwnProperty(task.id)
                        && !app.getEntityConverterService().isEquals(task, existing[task.id])) {
                        update.push(task);
                    }
                    else if (!existing.hasOwnProperty(task.id)) {
                        insert.push(task);
                    }
                }
                if (update.length) {
                    _this.updateMany(update);
                }
                _this.createMany(insert).then(function () {
                    _this.updateMany(update).then(function () {
                        resolve(tasks);
                    });
                });
            });
        });
    };
    TaskRepository.prototype.createMany = function (dtos) {
        return this.getEntity().bulkCreate(dtos);
    };
    ;
    TaskRepository.prototype.updateMany = function (dtos) {
        var entity = this.getEntity();
        return new Promise(function (resolve) {
            var dtosConsumable = dtos.concat();
            var consume = function () {
                if (dtosConsumable.length) {
                    var dto = dtosConsumable.shift();
                    entity.update(dto, {
                        where: {
                            id: dto.id
                        }
                    }).then(function () {
                        consume();
                    });
                }
                else {
                    resolve([]);
                }
            };
            consume();
        });
    };
    TaskRepository.prototype.getEntity = function () {
        return app.getEntity('Task');
    };
    return TaskRepository;
})();
exports.TaskRepository = TaskRepository;
