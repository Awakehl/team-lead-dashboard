/// <reference path="./../../../typings/node/node.d.ts" />
/// <reference path="./../../../typings/bluebird/bluebird.d.ts" />
/// <reference path="./../../../typings/sequelize/sequelize.d.ts" />
/// <reference path="./../../../typings/moment/moment.d.ts" />

import {TaskDTO} from "../dto/task-dto";
import {AppService} from "../service/app-service";
import http = require('http');
import https = require('https');
import Promise = require('bluebird');
import moment = require('moment');
import {ClientResponse} from "http";
import {UserDTO} from "../dto/user-dto";
import {ImportFilterDTO} from "../dto/import-filter-dto";

declare var app: AppService;

export class JiraTaskRepository {

    private config: any = app.getConf('jira');

    getTasks(users: UserDTO[], filter: ImportFilterDTO): Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve: Function, reject: Function):void => {
            var self = this;
            let requester = require(this.config['protocol']);
            let url: string;
            let issues: TaskDTO[];
            let issue: TaskDTO;
            let user: UserDTO;

            url = this.getBaseUrl(this.config['epics_url']);

            requester.get(url, (res: ClientResponse) => {
                var body:string = '';
                res.on('data', (d) => {
                    body += d.toString();
                });
                res.on('end', (d) => {
                    issues = [];
                    try {
                        var obj = JSON.parse(body);
                        issues = self.parseIssues(obj.issues);

                        let epics:string[] = [];
                        for (issue of issues) {
                            epics.push(issue.key);
                        }

                        let assignee: string[] = [];
                        for (user of users) {
                            assignee.push(user.name);
                        }

                        url = this.getBaseUrl(this.config['tasks_url'])
                            .replace('__DATETIME__', moment().subtract(filter.short, 'days').format('YYYY-MM-DD'))
                            .replace('__LONGDATETIME__', moment().subtract(filter.long, 'months').format('YYYY-MM-DD'))
                            .replace('__EPICS__', epics.join(','))
                            .replace('__ASSIGNEE__', assignee.join(','));

                        var req = requester.get(url, (res: ClientResponse) => {
                            var body:string = '';
                            res.on('data', function (d) {
                                body += d.toString();
                            });
                            res.on('end', function (d) {
                                var issues:TaskDTO[] = [];
                                try {
                                    var obj = JSON.parse(body);
                                    issues = self.parseIssues(obj.issues);
                                } catch (e) {
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


                    } catch (e) {
                        console.error('Jira error: ' + e);
                    }

                });
            });


        });
    };

    private getBaseUrl(endpointUrl: string): string {
        return this.config['protocol']+'://'+this.config['login']+':'+this.config['password']+'@'
            +this.config['host']
            +endpointUrl;
    }

    private parseIssues(issuesObj: any[]): TaskDTO[] {
        var issues = [];
        issuesObj.forEach(function(issue) {
            var dto: TaskDTO = new TaskDTO(
                +issue.id,
                issue.key,
                issue.fields.assignee ? issue.fields.assignee.name : null,
                +issue.fields.customfield_10004,
                issue.fields.summary,
                issue.fields.status.name,
                issue.fields.customfield_10007
            );

            issues.push(dto);
        });

        return issues;
    };

}