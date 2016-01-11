/// <reference path="./../../../typings/node/node.d.ts" />
/// <reference path="./../../../typings/bluebird/bluebird.d.ts" />
/// <reference path="./../../../typings/sequelize/sequelize.d.ts" />

import {TaskDTO} from "../dto/task-dto";
import {AppService} from "../service/app-service";
import http = require('http');
import https = require('https');

declare var app: AppService;

export class JiraTaskRepository {

    private config: any = app.getConf('jira');

    getTasks(): Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve: Function, reject: Function):void => {
            var options = {
                hostname: this.config.host,
                port: this.config.port,
                path: encodeURI(this.config.tasks_url.replace('__DATETIME__', app.getService('dateService')
                    .getDateInJiraFormat())),
                method: 'GET',
                auth: this.config.login + ':' + this.config.password
            };

            var self = this;
            let requester = require(this.config['protocol']);
            var req = requester.request(options, function (res) {
                var body:string = '';
                res.setEncoding('utf8');
                res.on('data', function (d) {
                    body += d.toString();
                });
                res.on('end', function (d) {
                    var issues:TaskDTO[] = [];
                    try {
                        var obj = JSON.parse(body);
                        issues = self.parseIssues(obj.issues);
                    } catch (e) {
                        console.error('Jira error: ' + e, 'options', options);
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
    }

    private parseIssues(issuesObj: any[]): TaskDTO[] {
        var issues = [];
        issuesObj.forEach(function(issue) {
            var dto: TaskDTO = new TaskDTO(
                issue.key,
                issue.fields.assignee ? issue.fields.assignee.name : null,
                issue.fields.customfield_10004,
                issue.fields.summary,
                issue.fields.status.name
            );

            issues.push(dto);
        });

        return issues;
    };

}