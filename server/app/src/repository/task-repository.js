var TaskRepository = (function () {
    function TaskRepository() {
    }
    TaskRepository.prototype.updateOrInsertTasks = function (tasks) {
        var _this = this;
        return new Promise(function (resolve) {
            var keys = [];
            var task;
            for (var _i = 0; _i < tasks.length; _i++) {
                task = tasks[_i];
                keys.push(task.key);
            }
            _this.getEntity().findAll({ where: { key: { $in: keys } } }).then(function (dbTasks) {
                var existing = {};
                for (var _i = 0; _i < dbTasks.length; _i++) {
                    var dbTask = dbTasks[_i];
                    task = app.getEntityConverterService().toTaskDTO(dbTask);
                    existing[task.key] = task;
                }
                var update = [];
                var insert = [];
                for (var _a = 0; _a < tasks.length; _a++) {
                    task = tasks[_a];
                    if (existing.hasOwnProperty(task.key)
                        && !app.getEntityConverterService().isEquals(task, existing[task.key])) {
                        update.push(task);
                    }
                    else if (!existing.hasOwnProperty(task.key)) {
                        insert.push(task);
                    }
                }
                if (update.length) {
                    _this.updateMany(update);
                }
                if (insert.length) {
                    _this.createMany(insert);
                }
                resolve();
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
                            key: dto.key
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
