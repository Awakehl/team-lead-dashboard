
var JiraTasksService = function() {

    var config = app.getConf('jira');

    this.getTasks = function(callback) {
        var https = require('https');

        var options = {
            hostname: config.host,
            port: config.port,
            path: encodeURI(config.tasks_url.replace('__DATETIME__', app.getService('dateService').getDateInJiraFormat())),
            method: 'GET',
            auth: config.login+':'+config.password
        };

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
                    issues = parseIssues(obj.issues);
                } catch (e) {
                    console.error('Jira error: '+ e);
                }
                callback(issues);

                /** @var {UpdateTasksDispatcherService} dispatcher **/
                var dispatcher = app.getService('updateTasksDispatcherService');

                /** @var {EventsService} eventsService **/
                var eventsService = app.getService('eventsService');

                var event = eventsService.createEvent(issues);

                dispatcher.eventDispatcher.dispatch(UpdateTasksDispatcherService.EVENT_TASKS_LOADED, event)

            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });
    };

    this.getSprintTasks = function(callback) {
        var https = require('https');

        var options = {
            hostname: config.host,
            port: 443,
            path: encodeURI(config.sprint_url),
            method: 'GET',
            auth: config.login+':'+config.password
        };

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
                    issues = parseIssues(obj.issues);
                } catch (e) {
                    console.error('Jira error: '+ e);
                }
                callback(issues);
            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });
    };

    /**
     * @param issuesObj
     * @returns {TaskDTO[]}
     */
    var parseIssues = function(issuesObj) {
        var issues = [];
        issuesObj.forEach(function(issue) {
            var dto = new JiraTaskDTO();
            dto.key = issue.key;
            dto.estimation = issue.fields.customfield_10004;
            dto.summary = issue.fields.summary;
            dto.assignee = issue.fields.assignee ? issue.fields.assignee.name : null;
            dto.status = issue.fields.status.name;

            issues.push(dto);
        });
        return issues;
    };

};

module.exports = JiraTasksService;