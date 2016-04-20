/// <reference path="typings/es6-promise/es6-promise.d.ts"/>

import {Promise} from 'es6-promise';
const p: Promise<string> = new Promise (
    (resolve: (str: string)=>void, reject: (str: string)=>void) => {
        const a: string = "hello from Promise";
        resolve(a);
    }
);
p.then((st) => {
    console.log(st);
});