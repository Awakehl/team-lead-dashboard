import {TaskDTO} from "../dto/task-dto";
import {AppService} from "./app-service";

declare var app: AppService;
declare var https = module('https');

export class JiraTasksService {

    private config: any = app.getConf('jira');
    
    getTasks():Promise {

        var promise:Promise = new Promise();

        var options = {
            hostname: this.config.host,
            port: this.config.port,
            path: encodeURI(this.config.tasks_url.replace('__DATETIME__', app.getService('dateService')
                .getDateInJiraFormat())),
            method: 'GET',
            auth: this.config.login+':'+this.config.password
        };

        var self = this;
        var req = https.rnyequest(options, function(res) {
            var body : string = '';
            res.setEncoding('utf8');
            res.on('data', function(d) {
                body += d.toString();
            });
            res.on('end', function(d) {
                var issues: TaskDTO[] = [];
                try {
                    var obj = JSON.parse(body);
                    issues = self.parseIssues(obj.issues);
                } catch (e) {
                    console.error('Jira error: '+ e);
                }

                promise.resolve(issues);

            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });

        return promise;
    }

    getSprintTasks(callback): Promise {

        var promise:Promise = new Promise();

        var options = {
            hostname: this.config.host,
            port: 443,
            path: encodeURI(this.config.sprint_url),
            method: 'GET',
            auth: this.config.login+':'+this.config.password
        };

        var  self = this;
    
        var req = https.request(options, function(res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function(d) {
                body += d.toString();
            });
            res.on('end', function(d) {
                var issues = [];
                try {
                    var obj = JSON.parse(body);
                    issues = self.parseIssues(obj.issues);
                } catch (e) {
                    console.error('Jira error: '+ e);
                }
                promise.resolve(issues);

            });
        });
        req.end();
    
        req.on('error', function(e) {
            promise.reject(e);
        });

        return promise;
    };
    
    private parseIssues(issuesObj: any[]): TaskDTO[] {
        var issues = [];
        issuesObj.forEach(function(issue) {
            var dto = new TaskDTO(
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