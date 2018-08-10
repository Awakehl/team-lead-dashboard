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
    JiraTaskRepository.prototype.getTasks = function (users, filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var self = _this;
            var requester = require(_this.config['protocol']);
            var fetch = function () {
                var url;
                var issues;
                var issue;
                var user;
                url = _this.getBaseUrl(_this.config['epics_url']);
                requester.get(url, function (res) {
                    var body = '';
                    res.on('data', function (d) {
                        body += d.toString();
                    });
                    res.on('end', function (d) {
                        issues = [];
                        try {
                            var obj = JSON.parse(body);
                            issues = self.parseIssues(obj.issues);
                            var epics = [];
                            for (var _i = 0; _i < issues.length; _i++) {
                                issue = issues[_i];
                                epics.push(issue.key);
                            }
                            var assignee = [];
                            for (var _a = 0; _a < users.length; _a++) {
                                user = users[_a];
                                assignee.push(user.name);
                            }
                            url = _this.getBaseUrl(_this.config['tasks_url'])
                                .replace('__DATETIME__', moment().subtract(filter.short, 'days').format('YYYY-MM-DD'))
                                .replace('__LONGDATETIME__', moment().subtract(filter.long, 'months').format('YYYY-MM-DD'))
                                .replace('__EPICS__', epics.join(','))
                                .replace('__ASSIGNEE__', "'" + assignee.join("','") + "'");
                            console.log(url);
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
                        }
                        catch (e) {
                            console.error('Jira error: ' + e);
                        }
                    });
                });
            };
            fetch();
        });
    };
    ;
    JiraTaskRepository.prototype.getBaseUrl = function (endpointUrl) {
        return this.config['protocol'] + '://' + this.config['login'] + ':' + this.config['password'] + '@'
            + this.config['host']
            + endpointUrl;
    };
    JiraTaskRepository.prototype.parseIssues = function (issuesObj) {
        var issues = [];
        issuesObj.forEach(function (issue) {
            var dto = new task_dto_1.TaskDTO(+issue.id, issue.key, issue.fields.assignee ? issue.fields.assignee.name : null, +issue.fields.customfield_10004, issue.fields.summary, issue.fields.status.name, issue.fields.customfield_10007);
            issues.push(dto);
        });
        return issues;
    };
    ;
    return JiraTaskRepository;
})();
exports.JiraTaskRepository = JiraTaskRepository;
//# sourceMappingURL=jira-task-repository.js.map