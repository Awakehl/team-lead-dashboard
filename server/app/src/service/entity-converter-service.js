var user_task_dto_1 = require("../dto/user-task-dto");
var task_dto_1 = require("../dto/task-dto");
var user_dto_1 = require("../dto/user-dto");
var user_calendar_dto_1 = require("../dto/user-calendar-dto");
var user_task_summary_dto_1 = require("../dto/user-task-summary-dto");
var EntityConverterService = (function () {
    function EntityConverterService() {
    }
    EntityConverterService.prototype.toTaskDTO = function (model) {
        return new task_dto_1.TaskDTO(model['id'], model['key'], model['assignee'], model['estimation'], model['summary'], model['status'], model['epic_key']);
    };
    EntityConverterService.prototype.toTaskDbObject = function (entity) {
        return {
            id: entity.id,
            key: entity.key,
            assignee: entity.assignee,
            estimation: entity.estimation,
            summary: entity.summary,
            status: entity.status,
            epic_key: entity.epicKey
        };
    };
    EntityConverterService.prototype.toUserTaskDTO = function (model) {
        return new user_task_dto_1.UserTaskDTO(model['id'], model['task_id'], model['user_id'], model['start_time'], model['end_time']);
    };
    EntityConverterService.prototype.toUserTaskDbObject = function (entity) {
        return {
            id: entity.id,
            task_id: entity.taskId,
            user_id: entity.userId,
            start_time: entity.startTime,
            end_time: entity.endTime
        };
    };
    EntityConverterService.prototype.toUserDTO = function (model) {
        return new user_dto_1.UserDTO(model['id'], model['name']);
    };
    EntityConverterService.prototype.toUserCalendarDTO = function (model) {
        return new user_calendar_dto_1.UserCalendarDTO(model['id'], model['user_id'], model['date'], model['start_time'], model['end_time']);
    };
    EntityConverterService.prototype.toUserTaskSummaryDTO = function (model) {
        return new user_task_summary_dto_1.UserTaskSummaryDTO(model['task_id'], model['user_id'], model['start_time'], model['end_time'], model['spent_time']);
    };
    EntityConverterService.prototype.isEquals = function (modelOne, modelTwo) {
        return JSON.stringify(modelOne) == JSON.stringify(modelTwo);
    };
    return EntityConverterService;
})();
exports.EntityConverterService = EntityConverterService;
//# sourceMappingURL=entity-converter-service.js.map