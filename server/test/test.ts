/// <reference path="../typings/bluebird/bluebird.d.ts"/>
import Promise = require('bluebird');

var p = new Promise(function (resolve) {

});

import requester = require('https');
import {RequestOptions} from "https";
import {ClientResponse} from "http";


/*requester.get('https://wkdauto.atlassian.net/rest/api/2/search?jql=updatedDate%3E2016-01-01', (res) => {
    console.log('statusCode: ', res.statusCode);
    console.log('headers: ', res.headers);

    let body: string = '';
    res.on('data', (d) => {
       // process.stdout.write(d);
        console.log(d);
        body += d;
    });

    res.on('end', (d) => {
        // process.stdout.write(d);
        console.log(body);
    });

}).on('error', (e) => {
    console.error('error: ' + e);
});*/

//let url = "https://semen.tanianskii@wkda.de:hfRh09Pj@wkdauto.atlassian.net/rest/api/2/search?jql=updatedDate > '2016-01-17 18:47'";

let url = "https://wkdauto.atlassian.net/rest/api/2/search?jql=updatedDate>'2015-01-01'";
var req = requester.get(url, (res: ClientResponse) =>
{
    var body
        :
        string = '';
    res.on('data', function (d) {
            body += d.toString();

            console.log('data:' + d);
        }
    )
});


//console.log(requester);

