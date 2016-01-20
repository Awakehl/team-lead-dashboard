/// <reference path="./../../../typings/node/node.d.ts" />
/// <reference path="./../../../typings/bluebird/bluebird.d.ts" />
/// <reference path="./../../../typings/sequelize/sequelize.d.ts" />
/// <reference path="./../../../typings/moment/moment.d.ts" />
var task_dto_1 = require("../dto/task-dto");
var Promise = require('bluebird');
var moment = require('moment');
var JiraTaskRepository = (function () {
    function JiraTaskRepository() {
        this.config = app.getConf('jira');
    }
    JiraTaskRepository.prototype.getTasks = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var self = _this;
            var requester = require(_this.config['protocol']);
            var url = _this.config['protocol'] + '://' + _this.config['login'] + ':' + _this.config['password'] + '@'
                + _this.config['host']
                + _this.config['tasks_url'].replace('__DATETIME__', moment().subtract(1, 'months').format('YYYY-MM-DD'));
            var req = requester.get(url, function (res) {
                var body = '';
                res.on('data', function (d) {
                    body += d.toString();
                });
                res.on('end', function (d) {
                    var issues = [];
                    try {
                        var obj = JSON.parse(body);
                        issues = self.parseIssues(obj.issues);
                    }
                    catch (e) {
                        console.error('Jira error: ' + e);
                    }
                    resolve(issues);
                });
            });
            req.end();
            req.on('error', function (e) {
                console.error(e);
                reject();
            });
        });
    };
    JiraTaskRepository.prototype.parseIssues = function (issuesObj) {
        var issues = [];
        issuesObj.forEach(function (issue) {
            var dto = new task_dto_1.TaskDTO(+issue.id, issue.key, issue.fields.assignee ? issue.fields.assignee.name : null, +issue.fields.customfield_10004, issue.fields.summary, issue.fields.status.name);
            issues.push(dto);
        });
        return issues;
    };
    ;
    return JiraTaskRepository;
})();
exports.JiraTaskRepository = JiraTaskRepository;
